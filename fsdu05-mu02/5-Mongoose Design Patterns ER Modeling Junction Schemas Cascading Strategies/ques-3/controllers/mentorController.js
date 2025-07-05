const Mentor = require('../model/Mentor');
const Session = require('../model/Session'); 

exports.addMentor = async (req, res) => {
  try {
    const mentor = new Mentor(req.body);
    await mentor.save();
    res.status(201).json(mentor);
  } catch (error) {
    res.status(400).json({ message: 'Failed to add mentor.', error: error.message });
  }
};

exports.getMentorActiveSessions = async (req, res) => {
  try {
    const { id } = req.params;
    const sessions = await Session.find({ mentor: id, isActive: true, status: 'Scheduled' })
      .populate('attendees')
      .select('-__v -isArchived')
      .sort({ sessionDate: 1 });

    if (!sessions || sessions.length === 0) {
      return res.status(404).json({ message: 'No active scheduled sessions found for this mentor.' });
    }
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching mentor sessions.', error: error.message });
  }
};


exports.countMentorAttendees = async (req, res) => {
  try {
    const { id } = req.params;
    const sessions = await Session.find({ mentor: id, isActive: true }).select('attendees');

    if (!sessions || sessions.length === 0) {
      return res.status(404).json({ message: 'No active sessions found for this mentor.' });
    }

    const uniqueLearnerIds = new Set();
    sessions.forEach(session => {
      session.attendees.forEach(learnerId => {
        uniqueLearnerIds.add(learnerId.toString());
      });
    });

    res.status(200).json({ mentorId: id, uniqueAttendeesCount: uniqueLearnerIds.size });
  } catch (error) {
    res.status(500).json({ message: 'Error counting mentor attendees.', error: error.message });
  }
};
 

exports.softDeleteMentor = async (req, res) => {
  try {
    const { id } = req.params;
    const mentor = await Mentor.findByIdAndUpdate(
      id,
      { $set: { isActive: false } },
      { new: true }
    );

    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found.' });
    }

    res.status(200).json({ message: 'Mentor and related upcoming sessions marked as inactive/cancelled.', mentor });
  } catch (error) {
    res.status(500).json({ message: 'Error soft deleting mentor.', error: error.message });
  }
};
 

exports.getMentorsWithNoActiveSessions = async (req, res) => {
  try {
    const mentorsWithActiveSessions = await Session.find({ isActive: true, status: 'Scheduled' }).distinct('mentor');
    const mentors = await Mentor.find({
      _id: { $nin: mentorsWithActiveSessions },
      isActive: true
    }).select('name specialization');

    res.status(200).json(mentors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching mentors with no active sessions.', error: error.message });
  }
};