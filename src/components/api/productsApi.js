import axios from "axios";

export const getProducts = () => {
  return axios.get("/api/products");
};

export const createProduct = ({ token, formData }) => {
  return axios.post("/api/products", formData, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const getUserProducts = ({ userId }) => {
  return axios.get(`/api/products/user/${userId}`);
};

export const deleteProduct = (token, productId) => {
  return axios.delete(`/api/products/${productId}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
