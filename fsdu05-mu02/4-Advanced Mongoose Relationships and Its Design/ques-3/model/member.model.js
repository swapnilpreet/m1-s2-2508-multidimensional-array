const mongoose = require('mongoose');
const { Schema } = mongoose;

const memberSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  borrowedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LibBook' }]
});

const MemberModel=mongoose.model("Member",memberSchema)

module.exports=MemberModel;
