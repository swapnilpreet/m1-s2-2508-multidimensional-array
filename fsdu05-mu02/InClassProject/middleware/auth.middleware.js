
const jwt = require("jsonwebtoken");

const authMiddleware = (role) => {

  return (req, res, next) => {
    let decoded;
    try {
      let token = req.headers?.authorization?.split(" ")[1];
      if (token) {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } else {
        // console.log(decoded, decoded.role, role);
        res.status(403).json({ message: "Token Not Found, Please Login Again" });
      }
    }catch(error){
      if(error.message=="jwt expired") {
        const refreshtoken=req.headers?.refreshtoken?.split(" ")[1];
        const refreshTokenDecoded=jwt.verify(
          refreshtoken,
          process.env.JWT_SECRET
        );
        if(refreshTokenDecoded){
          console.log("access token generate expired new token generated")
          //if refreshtken valid then get userId and role from refreshtoken
          let newaccessToken = jwt.sign({userId:refreshTokenDecoded.userId,role: refreshTokenDecoded.role},process.env.JWT_SECRET,{ expiresIn:120});
          decoded = jwt.verify(newaccessToken, process.env.JWT_SECRET);
        } else {
          res.status(403).json({message:"token expired, Login Again"});
        }
      } else {
        res.status(500).json({ message: "somethging went wrong" });
      }
    }
    if (decoded) {
      if (role.includes(decoded.role)) {
        req.user = decoded.userId;
        next();
      } else {
        res.status(403).json({message:"Unauthorised....."});
      }
    } else{
      res.status(403).json({ message:"Login failed.Please login again"});
    }
  };


    // by default role comes in array even if you pass single
  //   return (req, res, next) => {
  //     try {
  //       let token = req.headers?.authorization?.split(" ")[1];
  //       if (token) {
  //         // verify token
  //         const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //         // decoded found true; then do next;
  //         // console.log(decoded); getting userId and role
  //         console.log(decoded, decoded.role, role);
  //         if (decoded) {
  //           // check decode role is equwal to passing role in middleware if yes then next otherwise give error
  //           if (role.includes(decoded.role)) {
  //             req.user = decoded.userId;
  //             next();
  //           } else {
  //             res.status(403).json({ message: "Unauthorised for this route" });
  //           }
  //         } else {
  //           res.status(403).json({ message: "Login failed.Please login again" });
  //         }
  //       } else {
  //         res.status(403).json({ message: "Login failed.Please login again" });
  //       }
  //     } catch (error) {
  //       if (error.message === "jwt expired") {

  //         // generate access token using refresh token
  //          const refreshtoken=req.headers?.refreshtoken?.split(" ")[1];
  //          const refreshTokenDecoded=jwt.verify(refreshtoken,process.env.JWT_SECRET);
  //         if(refreshTokenDecoded){
  //           // if refreshtken valid then get userId and role from refreshtoken
  //            let newaccessToken=jwt.sign({userId:refreshTokenDecoded.userId,role:refreshTokenDecoded.role},process.env.JWT_SECRET,{expiresIn:30});
  //           const decoded = jwt.verify(newaccessToken, process.env.JWT_SECRET);
  //         }
  //         res.status(403).json({ message:"token expired, Login Again"});
  //       } else {
  //         res.status(500).json({ message: "somethging went wrong" });
  //       }
  //     }
  //   };
  // };

};
module.exports = authMiddleware;
