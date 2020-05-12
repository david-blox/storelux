export const Types = {
  GET_PRODUCTS_REQUEST: "products/GET_PRODUCTS.REQUEST",
  GET_PRODUCTS_SUCCESS: "products/GET_PRODUCTS.SUCCESS",
  GET_PRODUCTS_FAILURE: "products/GET_PRODUCTS.FAILURE",
  CREATE_PRODUCT_REQUEST: "products/CREATE_PRODUCT.REQUEST",
  CREATE_PRODUCT_SUCCESS: "products/CREATE_PRODUCT.SUCCESS",
  CREATE_PRODUCT_FAILURE: "products/CREATE_PRODUCT.FAILURE",
  UPDATE_PRODUCT_SUCCESS: "products/UPDATE_PRODUCT.SUCCESS",
  UPDATE_PRODUCT_REQUEST: "products/UPDATE_PRODUCT.REQUEST",
  UPDATE_PRODUCT_FAILURE: "products/UPDATE_PRODUCT.FAILURE",
  DELETE_PRODUCT_REQUEST: "products/DELETE_PRODUCT.REQUEST",
  DELETE_PRODUCT_SUCCESS: "products/DELETE_PRODUCT.SUCCESS",
  PRODUCT_FAILURE: "products/PRODUCT.FAILURE",
};
// get products actions
export const getProductsRequest = () => ({
  type: Types.GET_PRODUCTS_REQUEST,
});

export const getProductsSuccess = ({ items }) => ({
  type: Types.GET_PRODUCTS_SUCCESS,
  payload: {
    items,
  },
});

// create product actions
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

export const createProductSuccess = () => ({
  type: Types.CREATE_PRODUCT_SUCCESS,
});

// update product actions
export const updateProductSuccess = ({ items }) => ({
  type: Types.UPDATE_PRODUCT_SUCCESS,
  payload: {
    items,
  },
});

export const updateProductsRequest = ({
  _id,
  name,
  userId,
  category,
  price,
  units,
}) => ({
  type: Types.UPDATE_PRODUCT_REQUEST,
  payload: {
    _id,
    name,
    userId,
    category,
    price,
    units,
  },
});

export const deleteProductRequest = (productId) => ({
  type: Types.DELETE_PRODUCT_REQUEST,
  payload: {
    productId,
  },
});
export const deleteProductSuccess = () => ({
  type: Types.DELETE_PRODUCT_SUCCESS,
});

export const productError = ({ error }) => ({
  type: Types.PRODUCT_FAILURE,
  payload: {
    error,
  },
});
