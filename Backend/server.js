const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// In-memory stores
const users = [];
const userTasks = {}; // { email: [task1, task2] }

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

module.exports = { users, userTasks };

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
