import { Types } from "./usersActions";

const INITIAL_STATE = {
  items: [],
  error: "",
};

export default function users(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_USERS_SUCCESS: {
      return {
        items: action.payload.items,
      };
    }
    case Types.GET_USERS_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    case Types.CREATE_USER_REQUEST: {
      return {
        ...state,
        items: action.payload.items,
      };
    }
    case Types.USER_SIGNUP_FAILURE: {
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
