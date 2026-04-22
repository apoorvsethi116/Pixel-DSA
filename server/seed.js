const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Problem = require('./models/Problem');

dotenv.config();

const problems = [
  {
    title: 'Two Sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    difficulty: 'Easy',
    tags: ['Array', 'Hash Map'],
    link: 'https://leetcode.com/problems/two-sum/'
  },
  {
    title: 'Valid Parentheses',
    description: 'Given a string s containing just the characters (, ), {, }, [ and ], determine if the input string is valid.',
    difficulty: 'Easy',
    tags: ['Stack', 'String'],
    link: 'https://leetcode.com/problems/valid-parentheses/'
  },
  {
    title: 'Merge Two Sorted Lists',
    description: 'Merge two sorted linked lists and return it as a sorted list.',
    difficulty: 'Easy',
    tags: ['Linked List', 'Recursion'],
    link: 'https://leetcode.com/problems/merge-two-sorted-lists/'
  },
  {
    title: 'Longest Substring Without Repeating Characters',
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    difficulty: 'Medium',
    tags: ['Sliding Window', 'Hash Map'],
    link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/'
  },
  {
    title: 'Binary Search',
    description: 'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums.',
    difficulty: 'Easy',
    tags: ['Binary Search', 'Array'],
    link: 'https://leetcode.com/problems/binary-search/'
  },
  {
    title: 'Container With Most Water',
    description: 'Given n non-negative integers a1, a2, ..., an, find two lines that together with the x-axis form a container that contains the most water.',
    difficulty: 'Medium',
    tags: ['Two Pointers', 'Array'],
    link: 'https://leetcode.com/problems/container-with-most-water/'
  },
  {
    title: 'Word Search',
    description: 'Given an m x n grid of characters board and a string word, return true if word exists in the grid.',
    difficulty: 'Medium',
    tags: ['Backtracking', 'DFS'],
    link: 'https://leetcode.com/problems/word-search/'
  },
  {
    title: 'Trapping Rain Water',
    description: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    difficulty: 'Hard',
    tags: ['Two Pointers', 'Dynamic Programming'],
    link: 'https://leetcode.com/problems/trapping-rain-water/'
  },
  {
    title: 'Median of Two Sorted Arrays',
    description: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.',
    difficulty: 'Hard',
    tags: ['Binary Search', 'Array'],
    link: 'https://leetcode.com/problems/median-of-two-sorted-arrays/'
  },
  {
    title: 'LRU Cache',
    description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.',
    difficulty: 'Medium',
    tags: ['Design', 'Hash Map', 'Linked List'],
    link: 'https://leetcode.com/problems/lru-cache/'
  },
  {
    title: '3Sum',
    description: 'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that they add up to zero.',
    difficulty: 'Medium',
    tags: ['Two Pointers', 'Array'],
    link: 'https://leetcode.com/problems/3sum/'
  },
  {
    title: 'N-Queens',
    description: 'The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.',
    difficulty: 'Hard',
    tags: ['Backtracking', 'Array'],
    link: 'https://leetcode.com/problems/n-queens/'
  },
  {
    title: 'Reverse Linked List',
    description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    difficulty: 'Easy',
    tags: ['Linked List', 'Recursion'],
    link: 'https://leetcode.com/problems/reverse-linked-list/'
  },
  {
    title: 'Best Time to Buy and Sell Stock',
    description: 'Find the maximum profit you can achieve from a single transaction of buying and selling one stock.',
    difficulty: 'Easy',
    tags: ['Array', 'Dynamic Programming'],
    link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/'
  },
  {
    title: 'Climbing Stairs',
    description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps.',
    difficulty: 'Easy',
    tags: ['Dynamic Programming', 'Math'],
    link: 'https://leetcode.com/problems/climbing-stairs/'
  },
  {
    title: 'Number of Islands',
    description: 'Given an m x n 2D binary grid which represents a map of 1s (land) and 0s (water), return the number of islands.',
    difficulty: 'Medium',
    tags: ['DFS', 'BFS', 'Graph'],
    link: 'https://leetcode.com/problems/number-of-islands/'
  },
  {
    title: 'Top K Frequent Elements',
    description: 'Given an integer array nums and an integer k, return the k most frequent elements.',
    difficulty: 'Medium',
    tags: ['Hash Map', 'Heap'],
    link: 'https://leetcode.com/problems/top-k-frequent-elements/'
  },
  {
    title: 'Subsets',
    description: 'Given an integer array nums of unique elements, return all possible subsets (the power set).',
    difficulty: 'Medium',
    tags: ['Backtracking', 'Array'],
    link: 'https://leetcode.com/problems/subsets/'
  },
  {
    title: 'Validate Binary Search Tree',
    description: 'Given the root of a binary tree, determine if it is a valid binary search tree (BST).',
    difficulty: 'Medium',
    tags: ['Tree', 'DFS'],
    link: 'https://leetcode.com/problems/validate-binary-search-tree/'
  },
  {
    title: 'Binary Tree Level Order Traversal',
    description: 'Given the root of a binary tree, return the level order traversal of its nodes values.',
    difficulty: 'Medium',
    tags: ['Tree', 'BFS'],
    link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/'
  },
  {
    title: 'Kth Largest Element in an Array',
    description: 'Given an integer array nums and an integer k, return the kth largest element in the array.',
    difficulty: 'Medium',
    tags: ['Heap', 'Divide and Conquer'],
    link: 'https://leetcode.com/problems/kth-largest-element-in-an-array/'
  },
  {
    title: 'Lowest Common Ancestor of a BST',
    description: 'Find the lowest common ancestor (LCA) node of two given nodes in a BST.',
    difficulty: 'Medium',
    tags: ['Tree', 'Recursion'],
    link: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/'
  },
  {
    title: 'Clone Graph',
    description: 'Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.',
    difficulty: 'Medium',
    tags: ['Graph', 'DFS', 'BFS'],
    link: 'https://leetcode.com/problems/clone-graph/'
  },
  {
    title: 'Coin Change',
    description: 'Return the fewest number of coins that you need to make up a certain amount.',
    difficulty: 'Medium',
    tags: ['Dynamic Programming', 'BFS'],
    link: 'https://leetcode.com/problems/coin-change/'
  },
  {
    title: 'Longest Palindromic Substring',
    description: 'Given a string s, return the longest palindromic substring in s.',
    difficulty: 'Medium',
    tags: ['String', 'Dynamic Programming'],
    link: 'https://leetcode.com/problems/longest-palindromic-substring/'
  },
  {
    title: 'Merge Intervals',
    description: 'Given an array of intervals, merge all overlapping intervals.',
    difficulty: 'Medium',
    tags: ['Array', 'Sorting'],
    link: 'https://leetcode.com/problems/merge-intervals/'
  },
  {
    title: 'Word Break',
    description: 'Given a string s and a dictionary of strings, determine if s can be segmented into a space-separated sequence of one or more dictionary words.',
    difficulty: 'Medium',
    tags: ['Dynamic Programming', 'Trie'],
    link: 'https://leetcode.com/problems/word-break/'
  },
  {
    title: 'Valid Anagram',
    description: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise.',
    difficulty: 'Easy',
    tags: ['String', 'Hash Map'],
    link: 'https://leetcode.com/problems/valid-anagram/'
  },
  {
    title: 'Maximum Subarray',
    description: 'Given an integer array nums, find the subarray which has the largest sum and return its sum.',
    difficulty: 'Medium',
    tags: ['Array', 'Divide and Conquer'],
    link: 'https://leetcode.com/problems/maximum-subarray/'
  },
  {
    title: 'Linked List Cycle',
    description: 'Given head, the head of a linked list, determine if the linked list has a cycle in it.',
    difficulty: 'Easy',
    tags: ['Linked List', 'Two Pointers'],
    link: 'https://leetcode.com/problems/linked-list-cycle/'
  }
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Problem.deleteMany();
    await Problem.insertMany(problems);

    console.log(`✅ Seeded ${problems.length} problems`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
};

seed();
