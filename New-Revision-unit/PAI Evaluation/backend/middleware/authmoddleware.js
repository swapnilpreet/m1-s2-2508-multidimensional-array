const jwt = require("jsonwebtoken");
const  UserModel = require("../model/User.model");
 
const auth=async(req,res,next)=>{
    let token=req.header("Authorization").replace("Bearer ", "");

    if(!token){
        res.status(401).josn({msg:"token not found"});
    };

    try {
        const decoded=jwt.verify(token,process.env.secret_key);
        res.user=await UserModel(decoded.id);
        next();
    } catch (error) {
        res.status(401).json({msg:"Invalid token"})
    }
}


const admin=(req,res,next)=>{
    if(req.user.role!=="admin"){
        return res.status(403).json({msg:"you are not admin"})
    }
    next();
}

module.exports={auth,admin};
