
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getUsers
} from "../api/authApi";

import {
  createTask
} from "../api/taskapi";

import {
  getToken
} from "../utils/auth";

const TaskForm = ({ onTaskCreated }) => {
  const [users, setUsers] =
    useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: ""
  });

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getUsers(
          getToken()
        );

        setUsers(data.users);
      } catch (error) {
        toast.error(
          "Unable to load users"
        );
      }
    };

    loadUsers();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await createTask(
        form,
        getToken()
      );

      onTaskCreated(data.task);

      setForm({
        title: "",
        description: "",
        assignedTo: ""
      });

      toast.success(
        "Task created successfully"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to create task"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="task-form"
      onSubmit={handleSubmit}
    >
      <h2>Create Task</h2>

      <input
        type="text"
        name="title"
        placeholder="Task title"
        value={form.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Task description"
        value={form.description}
        onChange={handleChange}
      />

      <select
        name="assignedTo"
        value={form.assignedTo}
        onChange={handleChange}
        required
      >
        <option value="">
          Select user
        </option>

        {users.map((user) => (
          <option
            key={user._id}
            value={user._id}
          >
            {user.name} - {user.email}
          </option>
        ))}
      </select>

      <button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Creating..."
          : "Create Task"}
      </button>
    </form>
  );
};

export default TaskForm;

