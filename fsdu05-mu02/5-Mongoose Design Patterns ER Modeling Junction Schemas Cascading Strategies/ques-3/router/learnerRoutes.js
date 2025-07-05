const express = require('express');
const router = express.Router();
const learnerController = require('../controllers/learnerController');
 
router.post('/', learnerController.addLearner);
 
router.get('/:id/sessions', learnerController.getLearnerActiveSessions);
router.get('/:id/mentors', learnerController.getLearnerMentors);
router.get('/many-sessions', learnerController.getLearnersWithManySessions);
router.delete('/:id', learnerController.softDeleteLearner);

module.exports = router;