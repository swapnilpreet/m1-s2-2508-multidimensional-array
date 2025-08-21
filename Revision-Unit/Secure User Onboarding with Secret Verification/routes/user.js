import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password -secretAnswerHash"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/profile", auth, async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (name) {
      user.name = name;
    }
    if (password) {
      const rounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
      const salt = bcrypt.genSaltSync(rounds);
      const hash = bcrypt.hashSync(password, salt);
      user.password = hash;
    }
    await user.save();
    res.json({ message: "Profile updated" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
