import { Types } from "./productsActions";

const INITIAL_STATE = {
  items: [],
  error: "",
};

export default function products(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_PRODUCTS_SUCCESS: {
      return {
        ...state,
        items: action.payload.items,
      };
    }
    case Types.UPDATE_PRODUCT_SUCCESS: {
      return {
        items: action.payload.items,
      };
    }
    case Types.PRODUCT_FAILURE: {
      console.log(action.payload.error);
      return {
        ...state,
        error: action.payload.error,
      };
    }
    default:
      return state;
  }
}
