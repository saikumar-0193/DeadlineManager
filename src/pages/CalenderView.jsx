import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/CalenderView.css';

const CalenderView = () => {
  const [value, setValue] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(stored);
  }, []);

  const handleDateChange = (date) => {
    setValue(date);

    const selected = tasks.filter((task) => {
      const taskDate = new Date(task.deadline);
      return (
        taskDate.getFullYear() === date.getFullYear() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getDate() === date.getDate()
      );
    });

    setSelectedTasks(selected);
  };

  return (
    <div className="calendar-container">
      <h2>📅 Task Calendar</h2>
      <Calendar onChange={handleDateChange} value={value} />
      <div className="task-list-calendar">
        <h3>Tasks on {value.toDateString()}</h3>
        {selectedTasks.length > 0 ? (
          <ul>
            {selectedTasks.map((task, index) => (
              <li key={index}>
                <strong>{task.title}</strong> – {task.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks on this date.</p>
        )}
      </div>
    </div>
  );
};

export default CalenderView;
