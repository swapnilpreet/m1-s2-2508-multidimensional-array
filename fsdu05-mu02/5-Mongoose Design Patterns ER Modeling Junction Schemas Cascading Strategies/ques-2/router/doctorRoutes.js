const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

router.post('/', doctorController.addDoctor);
router.get('/:id/patients', doctorController.getPatientsConsultedByDoctor);
router.get('/:id/consultations/count', doctorController.getDoctorConsultationCount);
router.delete('/:id', doctorController.softDeleteDoctor);


module.exports = router;