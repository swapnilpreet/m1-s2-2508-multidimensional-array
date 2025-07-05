const Doctor = require('../model/Doctor');
const Consultation = require('../model/Consultation');


exports.addDoctor = async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(200).json(doctor);
  } catch (error) {
    console.error("Error adding doctor:", error);
    res.status(400).json({ message: 'Failed to add doctor.', error: error.message });
  }
};

exports.getPatientsConsultedByDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const consultations = await Consultation.find({ doctorId: id, isActive: true })
      .populate({
        path: 'patientId',
        select: 'name age gender -_id'
      }).sort({ consultedAt: -1 }).limit(10);
    if (!consultations || consultations.length === 0) {
      return res.status(404).json({ message: 'No active consultations found for this doctor or doctor does not exist.' });
    }
    const patients = consultations.map(c => c.patientId).filter(p => p);
    const uniquePatients = Array.from(new Map(patients.map(p => [p.name, p])).values());
    res.status(200).json(uniquePatients);
  } catch (error) {
    console.error("Error fetching patients for doctor:", error);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};


exports.getDoctorConsultationCount = async (req, res) => {
  try {
    const { id } = req.params;
    const count = await Consultation.countDocuments({ doctorId: id, isActive: true });
    res.status(200).json({ doctorId: id, activeConsultationCount: count });
  } catch (error) {
    console.error("Error counting consultations for doctor:", error);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};


exports.softDeleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: { isActive: false } },
      { new: true }
    );
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found.' });
    }
    res.status(200).json({ message: 'Doctor and related consultations marked as inactive.', doctor });
  } catch (error) {
    console.error("Error soft deleting doctor:", error);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};