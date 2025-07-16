
const jwt = require("jsonwebtoken");

const authMiddleware = (role) => {
  return (req, res, next) => {
    let token = req.headers?.authorization?.split(" ")[1];
    if (token) {
      const decoded = jwt.verify(token, process.env.jwt.screct);
      if (decoded) {
        if (role.includes(decoded.role)) {
          req.user = decoded.userId;
          next();
        } else {
          res.status(403).json({ message: "Unauthorised....." });
        }
      } else {
        res.status(403).json({ message: "token expired" });
      }
    } else {
      res.status(404).json({ message: "token not found" });
    }
  };
};

module.exports=authMiddleware;