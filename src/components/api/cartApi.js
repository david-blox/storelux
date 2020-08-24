import axios from "axios";

export const getCartByUserId = ({ userId, token }) => {
  return axios.get(`/api/products/${userId}/shoppingCart`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const updateProductQuantity = ({
  userId,
  token,
  productId,
  quantity,
}) => {
  return axios.patch(
    `/api/products/${userId}/shoppingCart`,
    { productId, quantity },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const deleteProductFromCart = (token, userId, productId) => {
  return axios.delete(`/api/products/${userId}/shoppingCart/${productId}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
