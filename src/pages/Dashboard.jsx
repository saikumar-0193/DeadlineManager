// src/pages/Dashboard.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load tasks from localStorage when component mounts
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="logo">
          📅 <span>Deadline Manager</span>
        </div>
        <button className="create-btn" onClick={() => navigate('/create-task')}>
          + New Task
        </button>
      </div>

      <div className="task-section">
        <h1>My Tasks</h1>
        <TaskList tasks={tasks} />
      </div>
    </div>
  );
};

export default Dashboard;
