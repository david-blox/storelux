import { Types } from "./productsActions";

const INITIAL_STATE = {
  items: [],
  error: "",
};

export default function products(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_PRODUCTS_SUCCESS: {
      return {
        items: action.payload.items,
      };
    }
    case Types.GET_PRODUCTS_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    default:
      return state;
  }
}
