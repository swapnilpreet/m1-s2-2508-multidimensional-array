const Patient = require('../model/Patient');
const Consultation = require('../model/Consultation'); 

 
exports.addPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(200).json(patient);
  } catch (error) {
    console.error("Error adding patient:", error);
    res.status(400).json({ message: 'Failed to add patient.', error: error.message });
  }
};


exports.getDoctorsConsultedByPatient = async (req, res) => {
  try {
    const { id } = req.params;
    const consultations = await Consultation.find({ patientId: id, isActive: true })
      .populate({
        path: 'doctorId',
        select: 'name specialization -_id'
      }).sort({ consultedAt: -1 });
    if (!consultations || consultations.length === 0) {
      return res.status(404).json({ message: 'No active consultations found for this patient or patient does not exist.' });
    }
    const doctors = consultations.map(c => c.doctorId).filter(d => d);
    const uniqueDoctors = Array.from(new Map(doctors.map(d => [d.name, d])).values());
    res.status(200).json(uniqueDoctors);
  } catch (error) {
    console.error("Error fetching doctors for patient:", error);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};


exports.getPatientsByGender = async (req, res) => {
  try {
    const { gender } = req.query;
    let query = { isActive: true };
    if (gender) {
      query.gender = gender;
    }
    const patients = await Patient.find(query);
    res.status(200).json(patients);
  } catch (error) {
    console.error("Error fetching patients by gender:", error);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};


exports.softDeletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findByIdAndUpdate(
      id,
      { $set: { isActive: false } },
      { new: true }
    );
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found.' });
    }
    res.status(200).json({ message: 'Patient and related consultations marked as inactive.', patient });
  } catch (error) {
    console.error("Error soft deleting patient:", error);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};