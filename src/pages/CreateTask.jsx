import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateTask() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user._id) {
      alert('User not logged in');
      return;
    }

    const task = {
      title,
      description,
      deadline,
      userId: user._id
    };

    try {
      const res = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      });

      const data = await res.json();
      if (res.ok) {
        alert('Task created');
        navigate('/dashboard');
      } else {
        alert(data.message || 'Task creation failed');
      }
    } catch (err) {
      console.error('Error creating task:', err);
      alert('Error creating task');
    }
  };

  return (
    <div className="create-task-wrapper"> {/* ✅ Fix class name */}
      <form className="create-task-form" onSubmit={handleSubmit}> {/* ✅ Fix class name */}
        <h2>Create New Task</h2>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
}

export default CreateTask;
