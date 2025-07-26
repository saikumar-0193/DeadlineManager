// src/pages/Dashboard.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user?.email) {
      navigate('/login');
      return;
    }
    setEmail(user.email);
    fetchTasks(user.email);
  }, [navigate]);

  const fetchTasks = async (userEmail) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${userEmail}`);
      const data = await res.json();
      if (Array.isArray(data.tasks)) {
        setTasks(data.tasks);
      } else {
        setTasks([]);
      }
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleCreateTask = () => {
    navigate('/create-task');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="logo">
          <div className="logo-circle">D</div>
          <span>Deadline Manager</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="create-btn" onClick={handleCreateTask}>Create Task</button>
          <button className="create-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <section className="task-section">
        <div className="task-section-header">
          <h1>My Tasks</h1>
          <button className="completed-btn">Show Completed</button>
        </div>

        <div className="task-list">
          {tasks.length === 0 ? (
            <p>No tasks yet. Create one!</p>
          ) : (
            tasks.map((task) => (
              <div key={task._id} className="task-card">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
