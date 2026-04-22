const User = require('../models/User');

// @route  GET /api/users/profile
// @access Private
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('solvedProblems', 'title difficulty xpReward');

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        xp: user.xp,
        streak: user.streak,
        solvedProblems: user.solvedProblems,
        solvedCount: user.solvedProblems.length,
        joinedAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  GET /api/users/progress
// @access Private
const getProgress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('solvedProblems', 'difficulty');

    const breakdown = { Easy: 0, Medium: 0, Hard: 0 };
    user.solvedProblems.forEach((p) => {
      if (breakdown[p.difficulty] !== undefined) breakdown[p.difficulty]++;
    });

    // XP thresholds for levels
    const level = Math.floor(user.xp / 100) + 1;
    const xpToNextLevel = level * 100 - user.xp;

    res.json({
      success: true,
      progress: {
        xp: user.xp,
        level,
        xpToNextLevel,
        streak: user.streak,
        solvedCount: user.solvedProblems.length,
        breakdown,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getProfile, getProgress };
