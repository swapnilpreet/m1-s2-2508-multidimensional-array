const mongoose = require('mongoose');
const Session = require('./Session');


const learnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

learnerSchema.pre('findOneAndUpdate', async function(next) {
  const update = this.getUpdate();
  if (update && update.$set && update.$set.isActive === false) {
    const learner = await this.model.findOne(this.getQuery());
    if (learner) {
      await Session.updateMany(
        { attendees: learner._id, status: { $ne: 'Completed' } },
        { $pull: { attendees: learner._id } }
      );
      console.log(`Cascaded: Learner ${learner._id} (name: ${learner.name}) removed from sessions.`);
    }
  }
  next();
});

const Learner = mongoose.model('Learner', learnerSchema);

module.exports = Learner;