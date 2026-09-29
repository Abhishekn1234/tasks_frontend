
import axios from "axios";
import { API_URL } from "./baseurl";



const authHeader = (token) => ({
  Authorization: `Bearer ${token}`
});

export const getTasks = async (token) => {
  const response = await axios.get(
    `${API_URL}/tasks`,
    {
      headers: authHeader(token)
    }
  );

  return response.data;
};

export const createTask = async (
  data,
  token
) => {
  const response = await axios.post(
    `${API_URL}/tasks`,
    data,
    {
      headers: authHeader(token)
    }
  );

  return response.data;
};

export const updateTaskStatus = async (
  id,
  data,
  token
) => {
  const response = await axios.patch(
    `${API_URL}/tasks/${id}/status`,
    data,
    {
      headers: authHeader(token)
    }
  );

  return response.data;
};

export const assignTask = async (
  id,
  assignedTo,
  token
) => {
  const response = await axios.patch(
    `${API_URL}/tasks/${id}/assign`,
    { assignedTo },
    {
      headers: authHeader(token)
    }
  );

  return response.data;
};

export const deleteTask = async (
  id,
  token
) => {
  const response = await axios.delete(
    `${API_URL}/tasks/${id}`,
    {
      headers: authHeader(token)
    }
  );

  return response.data;
};

export const getMetrics = async (token) => {
  const response = await axios.get(
    `${API_URL}/tasks/metrics`,
    {
      headers: authHeader(token)
    }
  );

  return response.data;
};

