// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const User = require('../models/User');

// POST: Create a new task
router.post('/', async (req, res) => {
  const { title, description, deadline, email } = req.body;

  if (!title || !description || !deadline || !email) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const newTask = new Task({
      title,
      description,
      deadline,
      userId: user._id,
    });

    await newTask.save();
    res.status(201).json({ message: 'Task created successfully.' });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// GET: Fetch tasks for a specific user
router.get('/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const tasks = await Task.find({ userId: user._id }).sort({ deadline: 1 });
    res.status(200).json({ tasks }); // 🔧 Wrap tasks in an object for consistency
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
