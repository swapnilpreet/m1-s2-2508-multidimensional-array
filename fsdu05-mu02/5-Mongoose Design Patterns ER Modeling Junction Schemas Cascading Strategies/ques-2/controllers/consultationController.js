const Consultation = require('../model/Consultation');
const Doctor = require('../model/Doctor');
const Patient = require('../model/Patient');


exports.addConsultation = async (req, res) => {
  try {
    const { doctorId, patientId, notes } = req.body;
    const doctor = await Doctor.findById(doctorId);
    const patient = await Patient.findById(patientId);

    if (!doctor || !doctor.isActive) {
      return res.status(400).json({ message: 'Doctor not found or is inactive.' });
    }
    if (!patient || !patient.isActive) {
      return res.status(400).json({ message: 'Patient not found or is inactive.' });
    }
    const consultation = new Consultation({ doctorId, patientId, notes });
    await consultation.save();
    res.status(200).json(consultation);
  } catch (error) {
    console.error("Error adding consultation:", error);
    res.status(400).json({ message: 'Failed to add consultation.', error: error.message });
  }
};


exports.getRecentConsultations = async (req, res) => {
  try {
    const recentConsultations = await Consultation.find({ isActive: true })
      .sort({ consultedAt: -1 })
      .limit(5)
      .populate('doctorId', 'name specialization')
      .populate('patientId', 'name age');

    res.status(200).json(recentConsultations);
  } catch (error) {
    console.error("Error fetching recent consultations:", error);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};