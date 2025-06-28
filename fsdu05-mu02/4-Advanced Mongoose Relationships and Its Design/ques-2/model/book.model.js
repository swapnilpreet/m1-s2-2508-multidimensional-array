const mongoose = require("mongoose");

const BooksSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 3 },
  author:{type:String,required:true},
  genre:{type:String,default:"action"},
  rentedBy:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const BookModel=mongoose.model("Book",BooksSchema)

module.exports=BookModel;