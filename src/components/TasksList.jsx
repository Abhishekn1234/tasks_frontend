
import TaskCard from "./TaskCard";

const TaskList = ({
  tasks,
  onTaskUpdated,
  onTaskDeleted
}) => {
  if (!tasks.length) {
    return (
      <div className="empty">
        No tasks found.
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onTaskUpdated={onTaskUpdated}
          onTaskDeleted={onTaskDeleted}
        />
      ))}
    </div>
  );
};

export default TaskList;
