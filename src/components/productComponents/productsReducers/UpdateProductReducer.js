import { Types } from "../productsActions/productsActions";
import { updateObject } from "../../store/utility";

const initialState = {
  item: [],
  error: null,
  loading: false,
  isDone: false,
  canRedirect: false,
};

const productRequest = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    isDone: false,
    canRedirect: false,
  });
};

const productSuccess = (state, action) => {
  return updateObject(state, {
    item: action.product,
    error: null,
    loading: false,
    isDone: true,
    canRedirect: false,
  });
};

const productFailure = (state, action) => {
  return updateObject(state, {
    error: action.error.error,
    loading: false,
    isDone: true,
    canRedirect: false,
  });
};

export default function updateProductReducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_PRODUCT_REQUEST:
      return productRequest(state, action);
    case Types.GET_PRODUCT_SUCCESS:
      return productSuccess(state, action);
    case Types.GET_PRODUCT_FAILURE:
      return productFailure(state, action);

    default:
      return state;
  }
}
