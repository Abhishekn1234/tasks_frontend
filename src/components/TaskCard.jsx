
import { useState } from "react";
import toast from "react-hot-toast";

import {
  updateTaskStatus,
  deleteTask
} from "../api/taskapi";

import {
  getToken
} from "../utils/auth";

const TaskCard = ({
  task,
  onTaskUpdated,
  onTaskDeleted
}) => {
  const [updating, setUpdating] =
    useState(false);

  const nextStatus = {
    Pending: "In Progress",
    "In Progress": "Completed",
    Completed: null
  };

  const handleStatusChange = async () => {
    const next = nextStatus[task.status];

    if (!next || updating) {
      return;
    }

    const oldStatus = task.status;
    const oldVersion = task.__v;

    const optimisticTask = {
      ...task,
      status: next,
      __v: oldVersion + 1
    };

    onTaskUpdated(optimisticTask);

    setUpdating(true);

    try {
      const shouldFail =
        Math.random() < 0.5;

      if (shouldFail) {
        throw new Error(
          "Simulated request failure"
        );
      }

      const data =
        await updateTaskStatus(
          task._id,
          {
            status: next,
            version: oldVersion
          },
          getToken()
        );

      onTaskUpdated(data.task);

      toast.success(
        `Task moved to ${next}`
      );
    } catch (error) {
      onTaskUpdated({
        ...task,
        status: oldStatus,
        __v: oldVersion
      });

      toast.error(
        error.response?.data?.message ||
          "Update failed. Changes rolled back."
      );
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(
        task._id,
        getToken()
      );

      onTaskDeleted(task._id);

      toast.success(
        "Task deleted"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <h3>{task.title}</h3>

        <span
          className={`status ${task.status
            .toLowerCase()
            .replace(" ", "-")}`}
        >
          {task.status}
        </span>
      </div>

      <p>
        {task.description ||
          "No description"}
      </p>

      <div className="task-info">
        <span>
          Assigned:{" "}
          {task.assignedTo?.name}
        </span>

        <span>
          Created by:{" "}
          {task.createdBy?.name}
        </span>
      </div>

      <div className="task-actions">
        {nextStatus[task.status] && (
          <button
            onClick={handleStatusChange}
            disabled={updating}
          >
            {updating
              ? "Updating..."
              : `Move to ${nextStatus[
                  task.status
                ]}`}
          </button>
        )}

        <button
          className="delete-button"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;

