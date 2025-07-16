const mongoose=require('mongoose');

const todoSchema=new mongoose.Schema({
    title:String,
    status:{type:Boolean,default:false},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"} // userId added behind the seen  from authmiddleware token not in req.body
})

const TodoModel=mongoose.model("todo",todoSchema)
module.exports=TodoModel;