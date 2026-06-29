import axios from "axios";
import { API_URL } from "../utils/constants";

// GET Users
export const getUsers = () => {
  return axios.get(API_URL);
};

// POST User
export const createUser = (user) => {
  return axios.post(API_URL, user);
};

// PUT User
export const updateUser = (id, user) => {
  return axios.put(`${API_URL}/${id}`, user);
};

// DELETE User
export const deleteUser = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};