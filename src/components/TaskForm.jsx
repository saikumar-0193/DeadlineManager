import { useState } from 'react';
import '../components/Task.css';

const TaskForm = ({ onAddTask }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    deadline: '',
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title || !task.description || !task.deadline) {
      return alert("Please fill in all fields.");
    }

    onAddTask(task); // ⬅️ Send task to parent
    setTask({ title: '', description: '', deadline: '' });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Create a Task</h2>
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={task.title}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Task Description"
        value={task.description}
        onChange={handleChange}
      />
      <input
        type="date"
        name="deadline"
        value={task.deadline}
        onChange={handleChange}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
