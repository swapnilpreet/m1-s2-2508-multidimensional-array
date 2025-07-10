const UserModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../config/nodemailer");

exports.signup = async (req, res) => {
  const { email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await new UserModel({ email, password: hashed, role }).save();
  res.send("Signup success");
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
  return res.status(400).send("Invalid credentials");

  const token = jwt.sign({ id:user._id,role:user.role}, process.env.JWT_SECRET);
  res.send({ token });
};

exports.forgotPassword = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) return res.send("If exists, email will be sent");

  const token = jwt.sign({ id: user._id }, process.env.RESET_SECRET, { expiresIn: "10m" });
  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 600000;
  await user.save();

  await transporter.sendMail({
    to: user.email,
    subject: "Reset Password",
    html: `<a href="http://localhost:3000/reset-password/${token}">Reset Link</a>`,
  });

  res.send("Reset link Sent to you Email");
};

exports.resetPassword = async (req, res) => {
  const token = req.params.token;
  try {
    const decoded = jwt.verify(token, process.env.RESET_SECRET);
    const user = await UserModel.findOne({
      _id: decoded.id,
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });
    if (!user) return res.status(400).send("Invalid or expired");
    user.password = await bcrypt.hash(req.body.password, 10);
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();
    res.send("Password reset successful");
  } catch {
    res.status(400).send("Invalid token");
  }
};
