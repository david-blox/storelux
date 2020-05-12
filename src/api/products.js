import axios from "axios";

export const getProducts = () => {
  return axios.get("/api/products");
};

export const createProduct = ({ name, userId, category, price, units }) => {
  return axios.post("/api/products", {
    name,
    userId,
    category,
    price,
    units,
  });
};

export const updateProduct = ({ id, name, userId, category, price, units }) => {
  return axios.put(`/api/products/${id}`, {
    id,
    name,
    userId,
    category,
    price,
    units,
  });
};

export const deleteProduct = (productId) => {
  return axios.delete(`/api/products/${productId}`);
};
