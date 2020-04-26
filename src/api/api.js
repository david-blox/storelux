import axios from "axios";

export const getApiCall = (routeName) => {
  return axios.get(routeName);
};
