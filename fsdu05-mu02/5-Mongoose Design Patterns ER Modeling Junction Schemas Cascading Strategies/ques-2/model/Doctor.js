const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  isActive: { type: Boolean, default: true }
});


doctorSchema.pre('findOneAndUpdate', async function(next) {
  const update = this.getUpdate();
  if (update.isActive === false) {
    const docToUpdate = await this.model.findOne(this.getQuery());
    if (docToUpdate){
      await mongoose.model('Consultation').updateMany(
        { doctorId: docToUpdate._id },
        { $set: { isActive: false } }
      );
      console.log(`Cascaded soft delete for consultations related to Doctor ${docToUpdate._id}`);
    }
  }
  next();
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;