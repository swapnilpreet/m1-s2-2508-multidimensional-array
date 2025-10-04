const UserModel = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.register=async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user=await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new UserModel({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ token ,user});
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

exports.login=async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }   
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }   
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token ,user});
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }   
}