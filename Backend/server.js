const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes'); // ✅ Corrected

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);  // login/register
app.use('/api/tasks', taskRoutes); // tasks

mongoose.connect('mongodb://localhost:27017/deadline-manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(5000, () => console.log('Server running on http://localhost:5000'));
}).catch((err) => console.error('MongoDB connection error:', err));
