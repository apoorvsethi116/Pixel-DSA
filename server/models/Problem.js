const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      required: [true, 'Difficulty is required'],
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    link: {
      type: String,
      trim: true,
    },
    xpReward: {
      type: Number,
      default: function () {
        const rewards = { Easy: 10, Medium: 25, Hard: 50 };
        return rewards[this.difficulty] || 10;
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Problem', problemSchema);
