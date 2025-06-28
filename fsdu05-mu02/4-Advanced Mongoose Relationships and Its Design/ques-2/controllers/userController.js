const BookModel = require("../model/book.model");
const UserModel = require("../model/user.model")



exports.addUser=async(req,res)=>{
    try {
        const user=new UserModel(req.body);
        await user.save();
        res.status(201).json({message:"User created",user});
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

exports.rentBook=async(req,res)=>{
    const {userId,bookId}=req.body;
    try {
        const user=await UserModel.findById(userId);
        const book=await BookModel.findById(bookId);
        if(!user || !book) return res.status(404).json({message:"user or book not found"});
        if(!user.rentedBooks.includes(bookId)){
            user.rentedBooks.push(bookId);
        }
        if(!book.rentedBy.includes(userId)){
            book.rentedBy.push(userId);
        }
        await user.save();
        await book.save();
        res.json({message:"Book rented Successfully"});
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

exports.returnBook=async(req,res)=>{
    const {userId,bookId}=req.body;
    try {
        await UserModel.findByIdAndUpdate(userId,{$pull:{rentedBooks:bookId}});
        await BookModel.findByIdAndUpdate(bookId,{$pull:{rentedBy:userId}});
        res.json({message:"Book returned successfully"})
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

exports.getuserRentals=async(req,res)=>{
    try {
        const user=await UserModel.findById(req.params.userId).populate("rentedBooks");
        if(!user) return res.status(404).json({message:"User not found"});
        res.json(user);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}