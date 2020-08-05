import { Types } from "../usersActions/UserActions";
import { updateObject } from "../../store/utility";

const initialState = {
  item: [],
  error: null,
  loading: false,
  isDone: false,
};

const getUserDataStart = (state, action) => {
  return updateObject(state, { error: null, loading: true, isDone: false });
};

const getUserDataSuccess = (state, action) => {
  return updateObject(state, {
    item: action.user,
    error: null,
    loading: false,
    isDone: true,
  });
};

const getUserDataFailure = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    isDone: true,
  });
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case Types.USER_PROFILE_REQUEST:
      return getUserDataStart(state, action);
    case Types.USER_PROFILE_SUCCESS:
      return getUserDataSuccess(state, action);
    case Types.USER_PROFILE_FAILURE:
      return getUserDataFailure(state, action);
    case Types.USER_UPDATE_REQUEST:
      return getUserDataStart(state, action);
    case Types.USER_UPDATE_SUCCESS:
      return getUserDataSuccess(state, action);
    case Types.USER_UPDATE_FAILURE:
      return getUserDataFailure(state, action);
    default:
      return state;
  }
}

// export const checkUserState = (state, isDone) => {
//   switch (isDone) {
//     case true:
//       return state;
//     case false:
//       return (state.isDone = false);
//     default:
//       throw new Error(`Unknown isDone result.`);
//   }
// };
