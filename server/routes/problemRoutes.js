const express = require('express');
const router = express.Router();
const {
  getProblems,
  getProblem,
  createProblem,
  updateProblem,
  deleteProblem,
  markSolved,
} = require('../controllers/problemController');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected
router.use(protect);

router.route('/').get(getProblems).post(createProblem);
router.route('/:id').get(getProblem).put(updateProblem).delete(deleteProblem);
router.post('/:id/solve', markSolved);

module.exports = router;
