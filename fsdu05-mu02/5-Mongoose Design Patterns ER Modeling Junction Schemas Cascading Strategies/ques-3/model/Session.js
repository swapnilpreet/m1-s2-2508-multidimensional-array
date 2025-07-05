const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor', required: true },
  topic: { type: String, required: true },
  sessionDate: { type: Date, required: true },
  durationMins: { type: Number, required: true, min: 10 },
  notes: { type: String, default: '' },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Learner' }],
  status: {
    type: String,
    enum: ['Scheduled', 'Completed', 'Cancelled', 'Cancelled (Mentor Inactive)'],
    default: 'Scheduled'
  },
  isActive: { type: Boolean, default: true },
  isArchived: { type: Boolean, default: false } 
}, { timestamps: true });


sessionSchema.methods.archive = async function() {
  this.isArchived = true;
  this.isActive = false;
  await this.save();
};

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;