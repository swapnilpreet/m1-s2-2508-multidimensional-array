const express = require('express');
const router = express.Router();
const mentorController = require('../controllers/mentorController');

 
router.post('/', mentorController.addMentor);
 
router.get('/:id/sessions', mentorController.getMentorActiveSessions); 
router.get('/:id/learners-count', mentorController.countMentorAttendees); 
router.get('/no-active-sessions', mentorController.getMentorsWithNoActiveSessions);
router.delete('/:id', mentorController.softDeleteMentor);

module.exports = router;