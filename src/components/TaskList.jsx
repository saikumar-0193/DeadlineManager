import '../components/Task.css';

const TaskList = ({ tasks }) => {
  return (
    <div className="task-list">
      <h2>Your Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        tasks.map((task, index) => (
          <div key={index} className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <small>Deadline: {task.deadline}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
