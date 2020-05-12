import axios from "axios";

export const getUsers = () => {
  return axios.get("/api/users");
};

export const createUser = ({ firstName, lastName, email, password }) => {
  debugger;
  return axios
    .post(
      "/api/signup",
      {
        firstName,
        lastName,
        email,
        password,
      },
      { withCredentials: true }
    )
    .then((response) => {
      console.log("registration res", response);
    })
    .catch((error) => {
      console.log("registration error", error);
    });
};
