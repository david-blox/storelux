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
