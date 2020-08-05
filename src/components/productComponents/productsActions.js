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

  GET_USER_PRODUCTS_REQUEST: "products/GET_USER_PRODUCTS.REQUEST",
  GET_USER_PRODUCTS_SUCCESS: "products/GET_USER_PRODUCTS.SUCCESS",
  GET_USER_PRODUCTS_FAILURE: "products/GET_USER_PRODUCTS.FAILURE",

  DELETE_PRODUCT_REQUEST: "products/DELETE_PRODUCT.REQUEST",
  DELETE_PRODUCT_SUCCESS: "products/DELETE_PRODUCT.SUCCESS",
  DELETE_PRODUCT_FAILURE: "products/DELETE_PRODUCT.FAILURE",
};

// get products actions
export const getProductsRequest = () => ({
  type: Types.GET_PRODUCTS_REQUEST,
});

export const getProductsSuccess = (items) => {
  return {
    type: Types.GET_PRODUCTS_SUCCESS,
    products: items,
  };
};

export const productError = (error) => ({
  type: Types.GET_PRODUCTS_FAILURE,
  error: error,
});

export const createProductRequest = (token, formData) => ({
  type: Types.CREATE_PRODUCT_REQUEST,
  token,
  formData,
});
export const createProductSuccess = (item) => ({
  type: Types.CREATE_PRODUCT_SUCCESS,
  product: item,
});

export const createProductFailure = (error) => {
  return {
    type: Types.CREATE_PRODUCT_FAILURE,
    error: error,
  };
};

export const getUserProductRequest = (userId) => ({
  type: Types.GET_USER_PRODUCTS_REQUEST,
  userId: userId,
});

export const getUserProductsSuccess = (items) => ({
  type: Types.GET_USER_PRODUCTS_SUCCESS,
  userProducts: items,
});

export const getUserProductsFailure = (error) => ({
  type: Types.GET_USER_PRODUCTS_FAILURE,
  error: error,
});

export const deleteProductRequest = (token, productId, userId) => ({
  type: Types.DELETE_PRODUCT_REQUEST,
  token,
  productId,
  userId,
});

export const deleteProductSuccess = () => ({
  type: Types.DELETE_PRODUCT_SUCCESS,
});

export const deleteProductFailure = (error) => ({
  type: Types.DELETE_PRODUCT_FAILURE,
  error: error,
});
