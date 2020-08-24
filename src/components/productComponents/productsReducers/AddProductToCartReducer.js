import { Types } from "../productsActions/addToCartActions";
import { updateObject } from "../../store/utility";

const initialState = {
  item: [],
  error: null,
  loading: false,
  isDone: false,
  success: false,
};

const addProductToCartStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    isDone: false,
    success: false,
  });
};

const addProductToCartSuccess = (state, action) => {
  return updateObject(state, {
    item: action.payload.cart,
    error: null,
    loading: false,
    success: true,
    isDone: true,
  });
};

const addProductToCartFailure = (state, action) => {
  return updateObject(state, {
    error: action.payload.error,
    loading: false,
    success: false,
    isDone: true,
  });
};

export default function addProductToCartReducer(state = initialState, action) {
  switch (action.type) {
    case Types.ADD_TO_CART_REQUEST:
      return addProductToCartStart(state, action);
    case Types.ADD_TO_CART_SUCCESS:
      return addProductToCartSuccess(state, action);
    case Types.ADD_TO_CART_FAILURE:
      return addProductToCartFailure(state, action);
    default:
      return state;
  }
}
