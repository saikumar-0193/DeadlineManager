import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateTask.css';

const EditTask = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState({ title: '', description: '', deadline: '' });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const index = parseInt(localStorage.getItem('editIndex'), 10);
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (index >= 0 && storedTasks[index]) {
      setEditIndex(index);
      setTask(storedTasks[index]);
    } else {
      navigate('/dashboard'); // invalid index fallback
    }
  }, [navigate]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks[editIndex] = task;
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
    navigate('/dashboard');
  };

  return (
    <div className="create-task-wrapper">
      <form className="create-task-form" onSubmit={handleSubmit}>
        <h2>Edit Task</h2>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
        />
        <input
          type="date"
          name="deadline"
          value={task.deadline}
          onChange={handleChange}
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditTask;
