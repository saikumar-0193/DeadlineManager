// src/pages/Dashboard.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  // Toggle task completion
  const handleToggleComplete = (index) => {
    const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const activeTasks = allTasks.filter(task => !task.completed);

    // Update the task in full list
    const taskToUpdate = activeTasks[index];
    taskToUpdate.completed = true;

    // Replace updated task in allTasks
    const updatedAllTasks = allTasks.map(task =>
      task.title === taskToUpdate.title &&
      task.description === taskToUpdate.description &&
      task.deadline === taskToUpdate.deadline
        ? { ...taskToUpdate }
        : task
    );

    localStorage.setItem('tasks', JSON.stringify(updatedAllTasks));

    // Refresh only uncompleted tasks in dashboard view
    setTasks(updatedAllTasks.filter(task => !task.completed));
  };

  // Load only uncompleted tasks on mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const activeTasks = storedTasks.filter(task => !task.completed);
    setTasks(activeTasks);
  }, []);

  // Delete from allTasks
  const handleDeleteTask = (indexToDelete) => {
    const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskToDelete = tasks[indexToDelete];

    const updatedAllTasks = allTasks.filter(task =>
      !(task.title === taskToDelete.title &&
        task.description === taskToDelete.description &&
        task.deadline === taskToDelete.deadline)
    );

    localStorage.setItem('tasks', JSON.stringify(updatedAllTasks));

    const updatedActiveTasks = tasks.filter((_, index) => index !== indexToDelete);
    setTasks(updatedActiveTasks);
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
