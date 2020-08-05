import { Types } from "./productsActions";
import { updateObject } from "../store/utility";

const initialState = {
  items: [], //products
  error: null,
  loading: false,
};

const requestProductsStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const requestProductsSuccess = (state, action) => {
  return updateObject(state, {
    items: action.products.items,
    error: null,
    loading: false,
  });
};

const getProductsFailure = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

export default function products(state = initialState, action) {
  switch (action.type) {
    case Types.GET_PRODUCTS_REQUEST:
      return requestProductsStart(state, action);
    case Types.GET_PRODUCTS_SUCCESS:
      return requestProductsSuccess(state, action);
    case Types.GET_PRODUCTS_FAILURE:
      return getProductsFailure(state, action);
    default:
      return state;
  }
}
