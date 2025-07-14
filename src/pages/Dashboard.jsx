// src/pages/Dashboard.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const handleToggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const handleDeleteTask = (indexToDelete) => {
    const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleEditTask = (indexToEdit) => {
    localStorage.setItem('editIndex', indexToEdit);
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
      </div>

      <div className="task-section">
        <h1>My Tasks</h1>
        <TaskList
          tasks={tasks}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
          onToggleComplete={handleToggleComplete}  // ✅ Required to fix the error
        />
      </div>
    </div>
  );
};

export default Dashboard;
