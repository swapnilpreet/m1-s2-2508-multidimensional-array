const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GOOGLE_APP_EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD
  }
});

exports.sendResetEmail = async (to, token) => {
  const resetURL = `http://localhost:3000/api/v1/auth/reset-password/${token}`;
  await transporter.sendMail({
    from: process.env.GOOGLE_APP_EMAIL,
    to,
    subject:'Password Reset Link',
    text:`Reset your password here: ${resetURL}`
  });
};
