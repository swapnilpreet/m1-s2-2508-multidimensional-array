
const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    name:String,
    email:{type:String,unique:true},
    password:String
})

const UserModel=mongoose.model("user-auth",UserSchema);

module.exports=UserModel;