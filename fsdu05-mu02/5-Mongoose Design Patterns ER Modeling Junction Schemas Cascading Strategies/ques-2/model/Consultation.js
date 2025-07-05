const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  consultedAt: { type: Date, default: Date.now },
  notes: { type: String, default: '' },
  isActive: { type: Boolean, default: true }
});

const Consultation = mongoose.model('Consultation', consultationSchema);

module.exports = Consultation;