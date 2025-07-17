import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const userEmail = user?.email;

  const fetchTasks = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${userEmail}`);
      const data = await res.json();

      // Check if response contains 'tasks' array
      if (Array.isArray(data.tasks)) {
        setTasks(data.tasks.filter(task => !task.completed));
      } else {
        console.error("Unexpected response format:", data);
        setTasks([]); // fallback
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    if (!userEmail) {
      navigate('/login');
      return;
    }
    fetchTasks();
  }, []);

  const handleToggleComplete = async (index) => {
    const updated = { ...tasks[index], completed: true };
    await fetch(`http://localhost:5000/api/tasks/${userEmail}/${index}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    fetchTasks();
  };

  const handleDeleteTask = async (index) => {
    await fetch(`http://localhost:5000/api/tasks/${userEmail}/${index}`, {
      method: 'DELETE',
    });
    fetchTasks();
  };

  const handleEditTask = (index) => {
    localStorage.setItem('editIndex', index);
    navigate('/edit-task');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="logo">
          <div className="logo-circle">DM</div>
          <span>Deadline Manager</span>
        </div>
        <button className="create-btn" onClick={() => navigate('/create-task')}>
          + New Task
        </button>
        <button className="logout-btn" onClick={() => {
          localStorage.removeItem('user');
          navigate('/login');
        }}>
          Logout
        </button>
      </div>

      <div className="task-section">
        <div className="task-section-header">
          <h1>My Tasks</h1>
          <button className="completed-btn" onClick={() => navigate('/completed-tasks')}>
            ✅ Completed
          </button>
        </div>

        <TaskList
          tasks={tasks}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
          onToggleComplete={handleToggleComplete}
        />
      </div>
    </div>
  );
};

export default Dashboard;
