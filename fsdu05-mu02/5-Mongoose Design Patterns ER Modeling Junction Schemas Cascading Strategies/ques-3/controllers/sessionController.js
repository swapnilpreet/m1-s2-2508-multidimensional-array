const Session = require('../model/Session');
const Mentor = require('../model/Mentor');
const Learner = require('../model/Learner');


exports.createSession = async (req, res) => {
  try {
    const { mentor, topic, sessionDate, durationMins, notes, attendees } = req.body;
    const existingMentor = await Mentor.findById(mentor);
    if (!existingMentor || !existingMentor.isActive) {
      return res.status(400).json({ message: 'Mentor not found or is inactive.' });
    }
    if (attendees && attendees.length > 0) {
      const existingLearners = await Learner.find({ _id: { $in: attendees }, isActive: true });
      if (existingLearners.length !== attendees.length) {
        return res.status(400).json({ message: 'One or more learners not found or are inactive.' });
      }
    }

    const session = new Session({ mentor, topic, sessionDate, durationMins, notes, attendees });
    await session.save();
    res.status(201).json(session);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create session.', error: error.message });
  }
};


exports.getRecentSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ isActive: true, isArchived: false, status: 'Scheduled' })
      .populate('mentor', 'name specialization')
      .populate('attendees', 'name email')
      .select('-__v')
      .sort({ sessionDate: -1 }) 
      .limit(5);

    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recent sessions.', error: error.message });
  }
};


exports.getSessionLearners = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await Session.findOne({ _id: id, isActive: true, isArchived: false })
      .populate('attendees', 'name email age');
    if (!session) {
      return res.status(404).json({ message: 'Active session not found.' });
    }
    res.status(200).json(session.attendees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching learners for session.', error: error.message });
  }
};

 
exports.archiveSession = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await Session.findById(id);

    if (!session) {
      return res.status(404).json({ message: 'Session not found.' });
    }
    if (session.isArchived) {
      return res.status(400).json({ message: 'Session is already archived.' });
    }

    await session.archive();
    res.status(200).json({ message: 'Session archived successfully and marked inactive.', session });
  } catch (error) {
    res.status(500).json({ message: 'Error archiving session.', error: error.message });
  }
};