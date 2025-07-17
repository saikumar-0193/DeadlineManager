const { userTasks } = require('../server');

exports.getTasks = (req, res) => {
  const { email } = req.params;
  res.json(userTasks[email] || []);
};

exports.addTask = (req, res) => {
  const { email } = req.params;
  const task = req.body;

  if (!userTasks[email]) userTasks[email] = [];
  userTasks[email].push(task);
  res.json({ success: true });
};

exports.updateTask = (req, res) => {
  const { email, index } = req.params;
  const updatedTask = req.body;

  if (!userTasks[email] || !userTasks[email][index]) {
    return res.status(404).json({ error: 'Task not found' });
  }

  userTasks[email][index] = updatedTask;
  res.json({ success: true });
};

exports.deleteTask = (req, res) => {
  const { email, index } = req.params;

  if (!userTasks[email] || !userTasks[email][index]) {
    return res.status(404).json({ error: 'Task not found' });
  }

  userTasks[email].splice(index, 1);
  res.json({ success: true });
};
