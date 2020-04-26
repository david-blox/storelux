export const Types = {
  GET_PRODUCTS_REQUEST: "products/GET_PRODUCTS.REQUEST",
  GET_PRODUCTS_SUCCESS: "products/GET_PRODUCTS.SUCCESS",
  GET_PRODUCTS_FAILURE: "products/GET_PRODUCTS.FAILURE",
  CREATE_PRODUCT_REQUEST: "products/CREATE_PRODUCT.REQUEST",
  CREATE_PRODUCT_SUCCESS: "products/CREATE_PRODUCT.SUCCESS",
  DELETE_PRODUCT_REQUEST: "prodcuts/DELETE_PRODUCT.REQUEST",
};

export const getProductsRequest = () => ({
  type: Types.GET_PRODUCTS_REQUEST,
});

export const getProductsSuccess = ({ items }) => ({
  type: Types.GET_PRODUCTS_SUCCESS,
  payload: {
    items,
  },
});

export const createProductRequest = ({
  name,
  userId,
  category,
  price,
  units,
}) => ({
  type: Types.CREATE_PRODUCT_REQUEST,
  payload: {
    name,
    userId,
    category,
    price,
    units,
  },
});

export const productError = ({ error }) => ({
  type: Types.GET_PRODUCTS_FAILURE,
  payload: {
    error,
  },
});
