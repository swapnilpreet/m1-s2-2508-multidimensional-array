const UserModel = require("../models/user.model");

const moderatorCheck = (req, res, next) => {
  UserModel.findById(req.user.id)
    .then((user) => {
      if (!user || (user.role != "moderator" && user.role !== "admin")) {
        return res
          .status(403)
          .json({ msg: "Moderator resources access denied" });
      }
      next();
    })
    .catch((err) => res.status(500).json({ msg: "Error checking user role" }));
};

module.exports = moderatorCheck;
