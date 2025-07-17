// src/pages/CreateTask.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateTask.css';

const CreateTask = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: '',
    description: '',
    deadline: '',
  });

  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const email = user?.email;
    if (!email) {
      alert('Please log in to create tasks.');
      navigate('/login');
    } else {
      setUserEmail(email);
    }
  }, [navigate]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!task.title || !task.description || !task.deadline) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...task,
          email: userEmail,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        navigate('/dashboard');
      } else {
        alert(result.message || 'Failed to create task.');
      }
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Server error. Please try again later.');
    }
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
