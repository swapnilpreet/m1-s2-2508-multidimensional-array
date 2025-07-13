const UserModel = require("../models/user.model");

const adminCheck = (req, res, next) => {
  console.log(req.user)
  UserModel.findById(req.user.id)
    .then((user) => {
      if (!user || user.role !== "admin") {
        return res.status(403).json({ msg: "Admin resources access denied" });
      }
      next();
    })
    .catch((err) => res.status(500).json({ msg: "Error checking user role" }));
};
module.exports = adminCheck;
