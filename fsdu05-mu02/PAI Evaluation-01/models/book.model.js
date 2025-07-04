const mongoose=require("mongoose");

const Bookschema=new mongoose.Schema({
    title:{type:String,required:true},
    author:{type:mongoose.Schema.Types.ObjectId,ref:"Author"},
    year:Number,
    genre:String,
    available:{type:Boolean,default:true}
})

const BookModel=mongoose.model("Book",Bookschema);
module.exports=BookModel;