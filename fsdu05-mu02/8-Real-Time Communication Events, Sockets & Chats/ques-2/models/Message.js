const mongoose = require('mongoose');

// Define the schema for a chat message
const messageSchema = new mongoose.Schema({
    user: { type: String, required: true }, // The username of the sender
    message: { type: String, required: true }, // The content of the message
    timestamp: { type: String, required: true }, // The exact time the message was sent (as a string)
    isAnnouncement: { type: Boolean, default: false }, // Flag to identify admin announcements
    room: { type: String, default: 'general' } // The room the message belongs to (for bonus feature)
}, {
    timestamps: true // Mongoose will automatically add createdAt and updatedAt fields
});

// Create and export the Mongoose model based on the schema
module.exports = mongoose.model('Message', messageSchema);
