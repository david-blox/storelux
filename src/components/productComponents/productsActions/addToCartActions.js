export const Types = {
  ADD_TO_CART_START: "cart/ADD_TO_CART_START",
  ADD_TO_CART_REQUEST: "cart/ADD_TO_CART_REQUEST",
  ADD_TO_CART_SUCCESS: "cart/ADD_TO_CART_SUCCESS",
  ADD_TO_CART_FAILURE: "cart/ADD_TO_CART_FAILURE",
};

// export const addToCartStart = () => ({
//   type: Types.ADD_TO_CART_START,
// });

export const addToCartRequest = (
  userId,
  token,
  productId,
  quantity,
  title,
  category,
  price,
  units,
  description,
  image
) => ({
  type: Types.ADD_TO_CART_REQUEST,
  payload: {
    userId,
    token,
    productId,
    quantity,
    title,
    category,
    price,
    units,
    description,
    image,
  },
});

export const addToCartSuccess = (item) => ({
  type: Types.ADD_TO_CART_SUCCESS,
  payload: item,
});

export const addToCartFailure = ({ error }) => ({
  type: Types.ADD_TO_CART_FAILURE,
  payload: {
    error,
  },
});
