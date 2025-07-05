const Learner = require('../model/Learner');
const Session = require('../model/Session'); 
const Mentor = require('../model/Mentor'); 

exports.addLearner = async (req, res) => {
  try {
    const learner = new Learner(req.body);
    await learner.save();
    res.status(201).json(learner);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Learner with this email already exists.', error: error.message });
    }
    res.status(400).json({ message: 'Failed to add learner.', error: error.message });
  }
};

 
exports.getLearnerActiveSessions = async (req, res) => {
  try {
    const { id } = req.params;
    const sessions = await Session.find({ attendees: id, isActive: true, status: { $ne: 'Cancelled' } })
      .populate('mentor', 'name specialization')
      .select('-__v -isArchived')
      .sort({ sessionDate: 1 });

    if (!sessions || sessions.length === 0) {
      return res.status(404).json({ message: 'No active sessions found for this learner.' });
    }
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching learner sessions.', error: error.message });
  }
};


exports.getLearnerMentors = async (req, res) => {
  try {
    const { id } = req.params;
    const sessions = await Session.find({ attendees: id, isActive: true }).select('mentor');

    if (!sessions || sessions.length === 0) {
      return res.status(404).json({ message: 'This learner has not interacted with any mentors yet.' });
    }
    const uniqueMentorIds = [...new Set(sessions.map(session => session.mentor.toString()))];
    const mentors = await Mentor.find({ _id: { $in: uniqueMentorIds }, isActive: true }).select('name specialization -_id');

    res.status(200).json(mentors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching mentors for learner.', error: error.message });
  }
};


exports.getLearnersWithManySessions = async (req, res) => {
  try {
    const allSessions = await Session.find({ isActive: true, status: { $ne: 'Cancelled' } }).select('attendees');

    const learnerSessionCounts = {};
    allSessions.forEach(session => {
      session.attendees.forEach(learnerId => {
        const id = learnerId.toString();
        learnerSessionCounts[id] = (learnerSessionCounts[id] || 0) + 1;
      });
    });
    const learnersWithMoreThan3SessionsIds = Object.keys(learnerSessionCounts).filter(id => learnerSessionCounts[id] > 3);
    const learners = await Learner.find({ _id: { $in: learnersWithMoreThan3SessionsIds }, isActive: true }).select('name email');

    res.status(200).json(learners);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching learners with many sessions.', error: error.message });
  }
};
 

exports.softDeleteLearner = async (req, res) => {
  try {
    const { id } = req.params;
    const learner = await Learner.findByIdAndUpdate(
      id,
      { $set: { isActive: false } },
      { new: true }
    );

    if (!learner) {
      return res.status(404).json({ message: 'Learner not found.' });
    }
    res.status(200).json({ message: 'Learner and their attendances in upcoming sessions updated.', learner });
  } catch (error) {
    res.status(500).json({ message: 'Error soft deleting learner.', error: error.message });
  }
};