const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const restrict = require('../middleware/roleMiddleware');
const bookingController = require('../controllers/bookingController');

router.use(auth);

router.post('/', bookingController.createBooking);
router.get('/', bookingController.getBookings);
router.put('/:id', bookingController.updateBooking);
router.delete('/:id', bookingController.cancelBooking);

router.patch('/:id/approve', restrict('admin'), bookingController.approveBooking);
router.patch('/:id/reject', restrict('admin'), bookingController.rejectBooking);
router.delete('/:id', restrict('admin'), bookingController.deleteBooking);

module.exports = router;
