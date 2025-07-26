const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Create a new task
router.post('/', async (req, res) => {
  try {
    const { title, description, deadline, userId } = req.body;
    console.log("Incoming create task request:", req.body);

    if (!title || !description || !deadline || !userId) {
      console.warn("Missing fields:", req.body);
      return res.status(400).json({ message: 'All fields are required' });
    }

    const task = new Task({ title, description, deadline, userId });
    await task.save();

    console.log("Task created successfully:", task);
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get tasks by user ID
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Fetching tasks for userId:", userId);

    const tasks = await Task.find({ userId });

    console.log("Tasks found:", tasks);
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
