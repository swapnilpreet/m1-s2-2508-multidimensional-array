const mongoose=require('mongoose');
const validator = require("validator");

const ProfileSchema=new mongoose.Schema({
    profileName:{type:String,enum:["fb", "twitter", "github", "instagram"],required:true},
    url:{type:String,required:true}
})

const ProfileModel=mongoose.model("profile",ProfileSchema);

module.exports=ProfileModel;