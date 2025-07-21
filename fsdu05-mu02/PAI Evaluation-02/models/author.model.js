const mongoose = require('mongoose');

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
