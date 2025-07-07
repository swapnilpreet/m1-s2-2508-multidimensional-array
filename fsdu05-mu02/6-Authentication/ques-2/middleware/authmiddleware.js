const jwt =require('jsonwebtoken');
require("dotenv").config();

function authmiddleware(req,res,next){
    const token=req.headers.authorization?.split(" ")[1];
    if(!token){
        res.status(404).json({message:"token not Found"});
    }
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        console.log("decoded",decoded)
        req.user=decoded;
        next();
    } catch (error) {
        res.status(500).json({messsage:error.message})
    }
}

module.exports=authmiddleware;