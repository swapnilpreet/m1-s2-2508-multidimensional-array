const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    username:String,
    email:{type:String,required:true,unique:true},
    password:String,
    role:{type:String,enum:['user','admin'],default:"user"},
    profileId:Number
})

const UserModel=mongoose.model("User",UserSchema);
module.exports=UserModel;
