const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
require('dotenv').config()


const PORT = 3000;
// console.log(process.env.GOOGLE_APP_EMAIL)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GOOGLE_APP_EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD
  }
});


app.get('/sendemail', async (req, res) => {
  try {
    const mailOptions = {
      from: process.env.GOOGLE_APP_EMAIL,
      to: [
        process.env.GOOGLE_APP_EMAIL,
        'venugopal.burli@masaischool.com'
      ],
      subject: 'Test Email from NEM Student',
      text: 'This is a testing Mail sent by NEM student, no need to reply.'
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.send('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send email.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
