const jwt = require("jsonwebtoken");
const UserModel = require("../model/User.model");
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ msg: "Token not found" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await UserModel.findById(decoded.id)
    if (!req.user) return res.status(401).json({ msg: "User not found" });
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Invalid token" });
  }
};
const admin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "You are not admin" });
  }
  next();
};
module.exports = { auth, admin };
