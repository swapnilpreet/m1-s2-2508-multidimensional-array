const mongoose=require('mongoose');

const AuthorSchema=new mongoose.Schema({
    name:{type:String,required:true},
    birthYear:Number,
    nationality:String
})

const AuthorModel=mongoose.model("Author",AuthorSchema);
module.exports=AuthorModel;
