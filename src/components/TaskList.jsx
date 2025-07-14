import {
  CheckCircle,
  Circle,
  Edit3,
  Trash2
} from 'lucide-react';
import '../components/Task.css';

const TaskList = ({ tasks, onDeleteTask, onEditTask, onToggleComplete }) => {
  const getTimeLeft = (deadline) => {
    const now = new Date();
    const taskDate = new Date(deadline);
    const diffMs = taskDate - now;

    if (diffMs <= 0) return null;

    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours >= 24) return null;

    return `${hours > 0 ? `${hours}h ` : ''}${minutes}m left`;
  };

  return (
    <div className="task-list">
    
      {tasks.length === 0 ? (
        <p className="empty-msg">No tasks yet.</p>
      ) : (
        <div className="task-grid">
          {tasks.map((task, index) => {
            const timeLeftText = getTimeLeft(task.deadline);
            const isUrgent = !!timeLeftText && !task.completed;

            return (
              <div
                key={index}
                className={`task-card ${task.completed ? 'task-completed' : ''} ${isUrgent ? 'red-background' : ''}`}
              >
                <div className="task-header">
                  <h3>{task.title}</h3>
                  <small className="deadline">🕒 {task.deadline}</small>
                </div>

                <p>{task.description}</p>

                {timeLeftText && !task.completed && (
                  <div className="time-left-badge">⏳ {timeLeftText}</div>
                )}

                <div className="task-actions">
                  <button onClick={() => onToggleComplete(index)} title="Toggle Complete">
                    {task.completed ? <CheckCircle size={22} /> : <Circle size={22} />}
                  </button>
                  <button onClick={() => onEditTask(index)} title="Edit Task">
                    <Edit3 size={22} />
                  </button>
                  <button onClick={() => onDeleteTask(index)} title="Delete Task">
                    <Trash2 size={22} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TaskList;
