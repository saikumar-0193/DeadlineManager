// src/pages/CreateTask.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateTask.css';

const CreateTask = () => {
  const navigate = useNavigate();
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
      alert('Please fill in all fields.');
      return;
    }

    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = [...storedTasks, task];
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    navigate('/dashboard');
  };

  return (
    <div className="create-task-wrapper">
      <form className="create-task-form" onSubmit={handleSubmit}>
        <h2>Create a New Task</h2>
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
    </div>
  );
};

export default CreateTask;
