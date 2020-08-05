import { Types } from "./categoriesActions";

const INITIAL_STATE = {
  items: [],
  error: "",
};

export default function categories(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_CATEGORIES_SUCCESS: {
      return {
        items: action.payload.items,
      };
    }
    case Types.GET_CATEGORIES_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    default: {
      return state;
    }
  }
}
