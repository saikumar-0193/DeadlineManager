const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  deadline: String,
  completed: Boolean,
  email: String, // add this line
});

module.exports = mongoose.model('Task', taskSchema);
