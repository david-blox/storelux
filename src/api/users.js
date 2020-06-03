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
