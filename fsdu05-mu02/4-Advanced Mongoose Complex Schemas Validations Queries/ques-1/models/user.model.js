const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    name:String,
    email:String,
    age:Number,
    addresses:[{type:mongoose.Schema.Types.ObjectId,ref:"Addres"}]
})

const UserModel=mongoose.model("userr",UserSchema);
module.exports=UserModel;