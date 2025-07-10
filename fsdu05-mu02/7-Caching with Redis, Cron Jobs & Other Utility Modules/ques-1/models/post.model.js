const mongoose=require("mongoose");

const postSchema =new mongoose.Schema({
  name:String,
  description:String
});

const postModel=mongoose.model("post",postSchema);
module.exports=postModel;
