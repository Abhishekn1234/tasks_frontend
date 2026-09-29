
import axios from "axios";
import { API_URL } from "./baseurl";


export const registerUser = async (data) => {
  const response = await axios.post(
    `${API_URL}/auth/register`,
    data
  );

  return response.data;
};

export const loginUser = async (data) => {
  const response = await axios.post(
    `${API_URL}/auth/login`,
    data
  );

  return response.data;
};

export const getUsers = async (token) => {
  const response = await axios.get(
    `${API_URL}/auth/users`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

