import axios from "axios";

export const getUsers = () => {
  return axios.get("/api/users");
};
export const createUser = ({ firstName, lastName, email, password }) => {
  return axios.post("/api/users/signup", {
    firstName,
    lastName,
    email,
    password,
  });
};

export const loginUser = ({ email, password }) => {
  return axios.post("/api/users/login", {
    email,
    password,
  });
};

export const getUserData = ({ userId }) => {
  return axios.get(`/api/users/${userId}`);
};

export const updateUserData = ({ userId, formData }) => {
  return axios.patch(`/api/users/${userId}`, formData);
};
