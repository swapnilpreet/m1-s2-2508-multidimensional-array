const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
  isActive: { type: Boolean, default: true }
});
 

patientSchema.pre('findOneAndUpdate', async function(next) {
  const update = this.getUpdate();
  if (update.isActive === false) {
    const docToUpdate = await this.model.findOne(this.getQuery());
    if (docToUpdate) {
      await mongoose.model('Consultation').updateMany(
        { patientId: docToUpdate._id },
        { $set: { isActive: false } }
      );
      console.log(`Cascaded soft delete for consultations related to Patient ${docToUpdate._id}`);
    }
  }
  next();
});


const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;