const BookModel = require("../model/book.model");
const UserModel = require("../model/user.model");



exports.addBook=async(req,res)=>{
    try {
        const book = new BookModel(req.body);
        await book.save();
        res.status(200).json({ message: 'Book added', book });
    } catch (error) {
        res.status(400).json({ error: err.message });
        console.log(error)
    }
};

exports.getsinglebookRented=async(req,res)=>{
    try {
        const bookexit=await BookModel.findById(req.params.bookId).populate("rentedBy")
        if(!bookexit){
            res.status(404).json({msg:"Book not found"})
        }
        res.status(201).json({mag:"getting all users for this book",data:bookexit});

    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log("Error occured in getsinglebookRented")
    }
}


exports.updatesbook=async(req,res)=>{
    try {
        const book=await BookModel.findByIdAndUpdate(req.params.bookId,req.body);
        if(!book){
            res.status(404).json({msg:"Book not found"})
        }
        res.status(201).json({msg:"Book updated"})
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log("Error occured in updatesbook");
    }
}

exports.deleteBook=async(req,res)=>{
    try {
        const book=await BookModel.findByIdAndDelete(req.params.bookId);
        if(!book) return res.status(404).json({msg:"book already deleted or not found"})
        await UserModel.updateMany({},{ $pull: { rentedBooks: book._id } })
        res.json({message:"Book deleted and removed from all users"})
    } catch (error) {
        res.status(400).json({error:error.message});
        console.log('error occured in delete-user');
    }
};

