const mongoose = require('mongoose');


const MessageSchema = new mongoose.Schema({
id: { type: String, unique: true, index: true }, // stable id used for upserts
user: { type: String, required: true },
text: { type: String, required: true },
isAdmin: { type: Boolean, default: false },
timestamp: { type: Date, default: Date.now, index: true }
}, { versionKey: false });


module.exports = mongoose.model('Message', MessageSchema);