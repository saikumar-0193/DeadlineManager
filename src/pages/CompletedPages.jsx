import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList';
import '../styles/Dashboard.css'; // reuse styling

const CompletedTasks = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const completed = storedTasks.filter(task => task.completed);
    setCompletedTasks(completed);
  }, []);

  const handleDeleteTask = (indexToDelete) => {
    const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskToDelete = completedTasks[indexToDelete];
    const updatedAllTasks = allTasks.filter(task => task.title !== taskToDelete.title || task.description !== taskToDelete.description);

    localStorage.setItem('tasks', JSON.stringify(updatedAllTasks));
    const updatedCompleted = completedTasks.filter((_, i) => i !== indexToDelete);
    setCompletedTasks(updatedCompleted);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="logo">
          <div className="logo-circle">DM</div>
          <span>Completed Tasks</span>
        </div>

        <button className="create-btn" onClick={() => navigate('/dashboard')}>
          🔙 Back
        </button>
      </div>

      <div className="task-section">
        <div className="task-section-header">
          <h1>Completed</h1>
        </div>

        <TaskList
          tasks={completedTasks}
          onDeleteTask={handleDeleteTask}
          onEditTask={() => {}} // disabled editing completed tasks
          onToggleComplete={() => {}} // no un-complete from this page
        />
      </div>
    </div>
  );
};

export default CompletedTasks;
