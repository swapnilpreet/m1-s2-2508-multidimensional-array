import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { SECRET_QUESTIONS } from "../models/User.js";

const router = express.Router();

function hashValue(value) {
  const rounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
  const salt = bcrypt.genSaltSync(rounds);
  return bcrypt.hashSync(value, salt);
}

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, secretQuestion, secretAnswer, role } =
      req.body;

    if (!name || !email || !password || !secretQuestion || !secretAnswer) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!SECRET_QUESTIONS.includes(secretQuestion)) {
      return res.status(400).json({ message: "Invalid secret question" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const passwordHash = hashValue(password);
    const secretAnswerHash = hashValue(secretAnswer.toLowerCase().trim());

    const user = new User({
      name,
      email,
      password: passwordHash,
      role: role === "admin" ? "admin" : "user",
      secretQuestion,
      secretAnswerHash,
    });

    await user.save();

    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d",
      }
    );

    return res.json({ message: "Login successful", token });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const { email, secretQuestion, secretAnswer, newPassword } = req.body;

    if (!email || !secretQuestion || !secretAnswer || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.secretQuestion !== secretQuestion) {
      return res
        .status(400)
        .json({ message: "Secret question does not match" });
    }

    const provided = secretAnswer.toLowerCase().trim();
    const answerOk = await bcrypt.compare(provided, user.secretAnswerHash);
    if (!answerOk)
      return res.status(400).json({ message: "Secret answer is incorrect" });
    const newHash = hashValue(newPassword);
    user.password = newHash;
    await user.save();
    return res.json({ message: "Password has been reset successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/secret-questions", (req, res) => {
  res.json({ questions: SECRET_QUESTIONS });
});

export default router;
