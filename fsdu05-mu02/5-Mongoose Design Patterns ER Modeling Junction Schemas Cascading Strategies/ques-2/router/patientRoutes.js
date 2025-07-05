const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');


router.post('/', patientController.addPatient);
router.get('/:id/doctors', patientController.getDoctorsConsultedByPatient);
router.get('/', patientController.getPatientsByGender); 
router.delete('/:id', patientController.softDeletePatient);

module.exports = router;