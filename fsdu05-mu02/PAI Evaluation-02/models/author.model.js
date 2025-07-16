const mongoose = require('mongoose');
const Book = require('./Book'); // Import Book model for cascade

const authorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    bio: {
        type: String,
    },
}, {
    timestamps: true,
});

const AuthorModel= mongoose.model('Author', authorSchema)
module.exports=AuthorModel;
