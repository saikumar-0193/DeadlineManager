import { useEffect, useState } from 'react';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState('');

  const fetchTasks = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${userId}`);
      const data = await response.json();

      if (response.ok) {
        if (Array.isArray(data)) {
          setTasks(data);
        } else if (Array.isArray(data.tasks)) {
          setTasks(data.tasks);
        } else {
          setTasks([]);
        }
      } else {
        console.error(`[FETCH TASKS] Server error:`, data);
      }
    } catch (error) {
      console.error(`[FETCH TASKS] Fetch failed:`, error);
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser._id) {
      setUserId(storedUser._id);
      fetchTasks(storedUser._id);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const handleCreateTask = () => {
    window.location.href = '/create-task';
  };

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <div className="logo">📘 Deadline Manager</div>
        <div className="header-buttons">
          <button onClick={handleCreateTask}>➕ Create Task</button>
          <button onClick={handleLogout}>🚪 Logout</button>
        </div>
      </header>

      <div className="dashboard-container">
        <h2>📋 My Tasks</h2>
        {tasks.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task._id} className="task-item">
                <div className="task-title">{task.title}</div>
                <div className="task-desc">{task.description}</div>
                <div className="task-deadline">Deadline: {new Date(task.deadline).toLocaleDateString()}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
