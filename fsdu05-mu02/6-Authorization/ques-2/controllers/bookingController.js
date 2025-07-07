const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  const booking = await Booking.create({ ...req.body, user: req.user._id });
  res.status(201).json(booking);
};

exports.getBookings = async (req, res) => {
  const filter = req.user.role === 'admin' ? {} : { user: req.user._id };
  const bookings = await Booking.find(filter).populate('user', 'username email');
  res.json(bookings);
};

exports.updateBooking = async (req, res) => {
  const booking = await Booking.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id, status: 'pending' },
    req.body,
    { new: true }
  );
  if (!booking) return res.status(403).json({ message: 'Cannot update this booking' });
  res.json(booking);
};

exports.cancelBooking = async (req, res) => {
  const booking = await Booking.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id, status: 'pending' },
    { status: 'cancelled' },
    { new: true }
  );
  if (!booking) return res.status(403).json({ message: 'Cannot cancel' });
  res.json(booking);
};

exports.approveBooking = async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
  res.json(booking);
};

exports.rejectBooking = async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
  res.json(booking);
};

exports.deleteBooking = async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ message: 'Booking deleted' });
};
