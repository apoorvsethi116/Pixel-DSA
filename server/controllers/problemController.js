const Problem = require('../models/Problem');
const User = require('../models/User');

// @route  GET /api/problems
// @access Private
const getProblems = async (req, res) => {
  try {
    const { difficulty, tag } = req.query;
    const filter = {};

    if (difficulty) filter.difficulty = difficulty;
    if (tag) filter.tags = { $in: [tag] };

    const problems = await Problem.find(filter).sort({ createdAt: -1 });

    // Attach isSolved flag for the requesting user
    const solvedSet = new Set(req.user.solvedProblems.map((id) => id.toString()));
    const problemsWithStatus = problems.map((p) => ({
      ...p.toObject(),
      isSolved: solvedSet.has(p._id.toString()),
    }));

    res.json({ success: true, count: problems.length, problems: problemsWithStatus });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  GET /api/problems/:id
// @access Private
const getProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem not found' });
    }
    res.json({ success: true, problem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  POST /api/problems
// @access Private (admin use — no role system for simplicity)
const createProblem = async (req, res) => {
  try {
    const { title, description, difficulty, tags } = req.body;

    if (!title || !description || !difficulty) {
      return res.status(400).json({ success: false, message: 'Title, description, and difficulty are required' });
    }

    const problem = await Problem.create({ title, description, difficulty, tags });
    res.status(201).json({ success: true, problem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  PUT /api/problems/:id
// @access Private
const updateProblem = async (req, res) => {
  try {
    const problem = await Problem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem not found' });
    }
    res.json({ success: true, problem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  DELETE /api/problems/:id
// @access Private
const deleteProblem = async (req, res) => {
  try {
    const problem = await Problem.findByIdAndDelete(req.params.id);
    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem not found' });
    }
    res.json({ success: true, message: 'Problem deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  POST /api/problems/:id/solve
// @access Private
const markSolved = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem not found' });
    }

    const user = await User.findById(req.user.id);
    const alreadySolved = user.solvedProblems.includes(problem._id);

    if (alreadySolved) {
      return res.status(400).json({ success: false, message: 'Problem already solved' });
    }

    // Add problem to solved list
    user.solvedProblems.push(problem._id);

    // Award XP
    user.xp += problem.xpReward;

    // Update streak
    const today = new Date().toDateString();
    const lastDate = user.lastSolvedDate ? new Date(user.lastSolvedDate).toDateString() : null;
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (lastDate === today) {
      // Already solved today, no streak change
    } else if (lastDate === yesterday) {
      user.streak += 1;
    } else {
      user.streak = 1; // Reset streak
    }

    user.lastSolvedDate = new Date();
    await user.save();

    res.json({
      success: true,
      message: `+${problem.xpReward} XP earned! 🎉`,
      xp: user.xp,
      streak: user.streak,
      solvedCount: user.solvedProblems.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getProblems, getProblem, createProblem, updateProblem, deleteProblem, markSolved };
