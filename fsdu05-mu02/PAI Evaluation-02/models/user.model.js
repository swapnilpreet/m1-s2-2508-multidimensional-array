const mongoose=require('mongoose');

const UserSchema=mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,enum:['viewer','editor','admin'],default:"viewer"}
})

const UserModel=mongoose.model("User",UserSchema);
module.exports=UserModel;
