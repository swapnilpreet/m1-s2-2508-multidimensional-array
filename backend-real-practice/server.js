// 11 — Refresh Token + Access Token Auth (JWT)

// What: Short-lived access token (e.g. 15m) + longer-lived refresh token (e.g. 7d). Refresh tokens are stored server-side to allow revocation.

// Why: Access tokens are short-lived for security. Refresh tokens let clients get new access tokens without re-login.

// Models
// models/User.js
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // bcrypt hash
});
module.exports = mongoose.model("User", userSchema);

// models/RefreshToken.js
const mongoose = require("mongoose");
const rtSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  token: String, // opaque token or JWT
  createdAt: { type: Date, default: Date.now },
  expiresAt: Date,
  revoked: { type: Boolean, default: false },
});
module.exports = mongoose.model("RefreshToken", rtSchema);

// Auth config
// config.js (example)
module.exports = {
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "access-secret",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "refresh-secret",
  ACCESS_EXPIRY: "15m",
  REFRESH_EXPIRE_DAYS: 7,
};

// Signup / Login / Refresh / Logout Routes
// routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");
const {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  ACCESS_EXPIRY,
  REFRESH_EXPIRE_DAYS,
} = require("../config");

const router = express.Router();

function signAccessToken(user) {
  return jwt.sign({ id: user._id }, JWT_ACCESS_SECRET, {
    expiresIn: ACCESS_EXPIRY,
  });
}

function signRefreshToken(payload) {
  // you can use JWT or opaque random token. We'll use opaque for easier revocation.
  return crypto.randomBytes(64).toString("hex");
}

// Signup
router.post("/signup", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email & password required" });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    res.status(201).json({ id: user._id, email: user.email });
  } catch (err) {
    next(err);
  }
});

// Login
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const accessToken = signAccessToken(user);
    const refreshTokenValue = signRefreshToken();

    const refreshToken = await RefreshToken.create({
      userId: user._id,
      token: refreshTokenValue,
      expiresAt: new Date(
        Date.now() + REFRESH_EXPIRE_DAYS * 24 * 60 * 60 * 1000
      ),
    });

    // return tokens (refreshToken should be stored securely client-side as HttpOnly cookie)
    res.json({ accessToken, refreshToken: refreshTokenValue });
  } catch (err) {
    next(err);
  }
});

// Refresh
router.post("/refresh", async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken)
      return res.status(400).json({ error: "Refresh token required" });

    const stored = await RefreshToken.findOne({ token: refreshToken });
    if (!stored || stored.revoked)
      return res.status(403).json({ error: "Invalid refresh token" });
    if (stored.expiresAt < new Date())
      return res.status(403).json({ error: "Expired refresh token" });

    const user = await User.findById(stored.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // create new access token (optionally rotate refresh token)
    const accessToken = signAccessToken(user);

    // OPTIONAL: rotate refresh token
    const newRefreshToken = signRefreshToken();
    stored.revoked = true;
    await stored.save();
    await RefreshToken.create({
      userId: user._id,
      token: newRefreshToken,
      expiresAt: new Date(
        Date.now() + REFRESH_EXPIRE_DAYS * 24 * 60 * 60 * 1000
      ),
    });

    res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (err) {
    next(err);
  }
});

// Logout (revoke refresh token)
router.post("/logout", async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.sendStatus(204);
    await RefreshToken.updateOne({ token: refreshToken }, { revoked: true });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

// Access middleware
// middleware/auth.js
const jwt = require("jsonwebtoken");
const { JWT_ACCESS_SECRET } = require("../config");

module.exports = function (req, res, next) {
  const header = req.headers.authorization;
  if (!header)
    return res.status(401).json({ error: "Missing Authorization header" });
  const token = header.split(" ")[1];
  jwt.verify(token, JWT_ACCESS_SECRET, (err, payload) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.userId = payload.id;
    next();
  });
};

// Production notes
// Store refresh tokens securely (HttpOnly cookie recommended).
// Rotate refresh tokens to mitigate replay.
// Provide a token revocation list (we used DB).
// Consider IP/device binding and limiting concurrent refresh tokens per user.





// 12 — OTP Login Service

// What: Passwordless login using one-time password (OTP) sent via SMS/Email. 
// We'll implement email-based OTP (console send) to keep it simple.

// Model
// models/Otp.js
const mongoose = require('mongoose');
const otpSchema = new mongoose.Schema({
  destination: String, // email or phone
  code: String,
  createdAt: { type: Date, default: Date.now },
  expiresAt: Date,
  used: { type: Boolean, default: false }
});
module.exports = mongoose.model('Otp', otpSchema);

// Endpoints (send OTP, verify OTP)
// routes/otp.js
const express = require('express');
const crypto = require('crypto');
const Otp = require('../models/Otp');
const User = require('../models/User'); // optional: auto-create user
const jwt = require('jsonwebtoken');
const { JWT_ACCESS_SECRET, ACCESS_EXPIRY } = require('../config');

const routerotp = express.Router();

function genCode() {
  // 6-digit numeric
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP
routerotp.post('/send', async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email required' });

    const code = genCode();
    // save OTP with 5 minute TTL
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await Otp.create({ destination: email, code, expiresAt });

    // TODO: integrate real SMS/Email provider (Twilio, AWS SES, SendGrid)
    console.log(`OTP for ${email}: ${code}`); // demo

    res.json({ message: 'OTP sent' });
  } catch (err) { next(err); }
});

// Verify OTP
routerotp.post('/verify', async (req, res, next) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) return res.status(400).json({ error: 'Invalid request' });

    const otp = await Otp.findOne({ destination: email, code, used: false }).sort({ createdAt: -1 });
    if (!otp) return res.status(400).json({ error: 'OTP invalid' });
    if (otp.expiresAt < new Date()) return res.status(400).json({ error: 'OTP expired' });

    otp.used = true;
    await otp.save();

    // Find or create user
    let user = await User.findOne({ email });
    if (!user) user = await User.create({ email, name: email.split('@')[0] });

    // Issue access token (and optionally refresh token)
    const accessToken = jwt.sign({ id: user._id }, JWT_ACCESS_SECRET, { expiresIn: ACCESS_EXPIRY });
    res.json({ accessToken });
  } catch (err) { next(err); }
});

module.exports = routerotp;

// Notes
// Protect /send endpoint with rate limits (per email/IP).
// Store OTP hashes instead of raw codes for stronger security: 
// hash code with salt when saving, compare hash when verifying.
// Use short expiry (3–10 minutes).
// In prod, use SMS/email provider and monitor delivery.





// 13 — Subscription-based Access Control (Free / Premium / Pro)
// What: Gate endpoints/features based on user's subscription plan.
// Model additions
// models/User.js (extend)
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  subscription: {
    plan: { type: String, enum: ['free','premium','pro'], default: 'free' },
    expiresAt: Date
  }
});

// Middleware (planCheck)
// middleware/subscription.js
module.exports = function(allowedPlans = []) {
  // allowedPlans: e.g. ['premium', 'pro']
  return (req,res,next)=>{
    const user = req.user; // assume previous auth middleware set req.user (full user doc)
    if (!user) return res.status(401).json({ error: 'Unauthorized' });
    const plan = user.subscription?.plan || 'free';
    if (allowedPlans.includes(plan)) return next();
    return res.status(403).json({ error: 'Upgrade required' });
  };
};

// Example protected route
// routes/features.js
const express = require('express');
const auth = require('../middleware/auth'); // sets req.userId
const User = require('../models/User');
const planCheck = require('../middleware/subscription');

const router = express.Router();

async function loadUser(req, res, next) {
  req.user = await User.findById(req.userId);
  next();
}

// route only for premium and pro
router.get('/premium-feature', auth, loadUser, planCheck(['premium','pro']), (req, res) => {
  res.json({ message: 'This is premium feature' });
});

// route only for pro
router.get('/pro-feature', auth, loadUser, planCheck(['pro']), (req, res) => {
  res.json({ message: 'Pro only feature' });
});

module.exports = router;

// Notes

// Keep subscription data consistent with payment provider (webhook sync).
// Consider feature flags per plan (not just string check) for fine-grained control.
// Check expiresAt and downgrade/notify users automatically (cron job or webhook driven).










// 14 — Chat API using WebSockets (Socket.IO)

// What: Real-time chat with rooms and simple message persistence.

// Server (Express + Socket.io)
// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const Message = require('./models/Message'); // defined below

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

io.on('connection', socket => {
  console.log('socket connected', socket.id);

  socket.on('join', async ({ room, userId }) => {
    socket.join(room);
    // load last 50 messages
    const messages = await Message.find({ room }).sort({ createdAt: -1 }).limit(50);
    socket.emit('history', messages.reverse());
  });

  socket.on('message', async ({ room, userId, text }) => {
    const msg = await Message.create({ room, userId, text });
    // broadcast to room
    io.to(room).emit('message', msg);
  });

  socket.on('disconnect', () => console.log('disconnected', socket.id));
});

server.listen(3000, () => console.log('listening 3000'));

// Message model
// models/Message.js
const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  room: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Message', schema);

// Client-side (example)
// // client (browser)


// <script src="/socket.io/socket.io.js"></script>
// <script>
//   const socket = io('http://localhost:3000');
//   socket.emit('join', { room: 'room-1', userId: 'USER_ID' });
//   socket.on('history', msgs => console.log('history', msgs));
//   socket.on('message', msg => console.log('incoming', msg));
//   // send
//   socket.emit('message', { room: 'room-1', userId: 'USER_ID', text: 'Hello!' });
// </script>

// Notes
// Authenticate socket connections: verify JWT before allowing join/message. Use io.use((socket,next)=>{...}).
// Consider rate limits and profanity filter.
// Persisting all messages to DB can grow; use retention policy or archives.
// For horizontal scaling, use Redis adapter for Socket.io.


// 16 — Build Payment Flow Using Stripe (Server-side)
// What: Create a Stripe PaymentIntent on server; handle webhooks to confirm payment and grant subscription.
// This is simplified for card payments. Use PCI-compliant Stripe elements on client.
// Install
// npm i stripe body-parser
// Server code (create payment intent + webhook)

// routes/payments.js
const express = require('express');
const Stripe = require('stripe');
const bodyParser = require('body-parser');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

// create payment intent (client will complete with Stripe.js)
router.post('/create-payment-intent', async (req, res, next) => {
  try {
    const { amount, currency = 'inr', metadata } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata, // optional: userId, planId
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) { next(err); }
});

module.exports = router;

// Webhook endpoint (verify signature)
// webhook.js
const express = require('express');
const bodyParser = require('body-parser');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const router = express.Router();

// Stripe requires raw body to verify signature
router.post('/webhook', bodyParser.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      // Mark order as paid / activate subscription
      // e.g., const userId = paymentIntent.metadata.userId
      console.log('PaymentIntent was successful!', paymentIntent.id);
      break;
    case 'payment_intent.payment_failed':
      console.log('Payment failed:', event.data.object.last_payment_error);
      break;
    // ... handle other events
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

module.exports = router;

// Client flow (high level)
// Client requests /create-payment-intent with amount & metadata (user id).
// Server returns clientSecret
// Client uses Stripe.js confirmCardPayment(clientSecret, { payment_method: ... }).
// On success, Stripe triggers payment_intent.succeeded webhook → server activates subscription / stores payment record.
// Notes & recommendations
// Never trust client to mark subscriptions active — rely on webhook verification.
// Use Stripe Checkout for simpler flows with hosted pages.
// Secure webhook endpoint: verify signature with STRIPE_WEBHOOK_SECRET.
// Save payment receipts & subscription records in your DB.
// For recurring billing, use Stripe Billing API (Products, Prices, Subscriptions), not PaymentIntents directly.