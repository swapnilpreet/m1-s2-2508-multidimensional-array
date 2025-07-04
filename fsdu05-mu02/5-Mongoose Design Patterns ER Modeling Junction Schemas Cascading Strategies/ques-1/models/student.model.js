const mongoose =require('mongoose');

const StudentSchema=  new mongoose.Schema({
    name:String,
    email:String,
    isActive:{type:Boolean,default:true}
})

const StudentModel=mongoose.model("student",StudentSchema);

module.exports=StudentModel;