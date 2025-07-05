const mongoose = require('mongoose');
const Session = require('./Session');

const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  bio: { type: String, default: '' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

mentorSchema.pre('findOneAndUpdate', async function(next) {
  const update = this.getUpdate();
  if (update && update.$set && update.$set.isActive === false) {
    const mentor = await this.model.findOne(this.getQuery());
    if (mentor) {
      await Session.updateMany(
        { mentor: mentor._id, status: { $ne: 'Completed' } },
        { $set: { isActive: false, status: 'Cancelled (Mentor Inactive)' } }
      );
      console.log(`Cascaded: Sessions for Mentor ${mentor._id} (name: ${mentor.name}) marked as inactive/cancelled.`);
    }
  }
  next();
});

const Mentor = mongoose.model('Mentor', mentorSchema);

module.exports = Mentor;