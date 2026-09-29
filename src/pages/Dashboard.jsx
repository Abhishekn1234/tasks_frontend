
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TasksList";
import Metrics from "../components/Metrics";

import {
  getTasks
} from "../api/taskapi";

import {
  getToken
} from "../utils/auth";

const Dashboard = () => {
  const [tasks, setTasks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const loadTasks = useCallback(
    async () => {
      try {
        const data =
          await getTasks(
            getToken()
          );

        setTasks(data.tasks);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Unable to load tasks"
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadTasks();

    const interval = setInterval(
      loadTasks,
      10000
    );

    return () => {
      clearInterval(interval);
    };
  }, [loadTasks]);

  const handleTaskCreated = (
    task
  ) => {
    setTasks((current) => [
      task,
      ...current
    ]);
  };

  const handleTaskUpdated = (
    updatedTask
  ) => {
    setTasks((current) =>
      current.map((task) =>
        task._id === updatedTask._id
          ? updatedTask
          : task
      )
    );
  };

  const handleTaskDeleted = (
    taskId
  ) => {
    setTasks((current) =>
      current.filter(
        (task) =>
          task._id !== taskId
      )
    );
  };

  return (
    <>
      <Navbar />

      <main className="dashboard">
        <div className="dashboard-header">
          <div>
            <h1>
              Collaborative Tasks
            </h1>

            <p>
              Manage tasks in real time
            </p>
          </div>
        </div>

        <div className="dashboard-grid">
          <TaskForm
            onTaskCreated={
              handleTaskCreated
            }
          />

          <Metrics />
        </div>

        <section className="tasks-section">
          <div className="section-header">
            <h2>Tasks</h2>

            <span>
              {tasks.length} tasks
            </span>
          </div>

          {loading ? (
            <div className="loading">
              Loading tasks...
            </div>
          ) : (
            <TaskList
              tasks={tasks}
              onTaskUpdated={
                handleTaskUpdated
              }
              onTaskDeleted={
                handleTaskDeleted
              }
            />
          )}
        </section>
      </main>
    </>
  );
};

export default Dashboard;

