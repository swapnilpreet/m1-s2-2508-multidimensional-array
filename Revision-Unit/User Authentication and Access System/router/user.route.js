import express from "express";
import UserModel from "../model/user.model.js";
import bcrypt from 'bcrypt'
import { auth, isAdmin } from "../middleware/auth.js";
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All field are required" });
    }
    const userexist = await UserModel.findeOne({ email });
    if (userexist) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });
    await newUser.save();
    return res.status(201).json({ message: "User registred successfully" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/user-dashboard", auth, (req, res) => {
  res.json({ message: "Welcome User! You are logged in." });
});

router.get("/admin-dashboard", auth, isAdmin, (req, res) => {
  res.json({ message: "Welcome Admin! You have special access." });
});

export default router;