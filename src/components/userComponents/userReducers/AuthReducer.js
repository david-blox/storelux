import { Types } from "../usersActions/authActions";
import { updateObject } from "../../store/utility";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  isLogin: false,
};

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true, isLogin: false });
};

const authUserSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    userId: action.userId,
    expiresIn: action.tokenExpirationTime,
    error: null,
    loading: false,
    isLogin: true,
  });
};

const AuthUserFailure = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    isLogin: false,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, { token: null, userId: null, isLogin: false });
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case Types.USER_AUTH_START:
      return authStart(state, action);
    case Types.USER_LOGIN_START:
      return authStart(state, action);
    case Types.USER_AUTH_SUCCESS:
      return authUserSuccess(state, action);
    case Types.USER_LOGIN_SUCCESS:
      return authUserSuccess(state, action);
    case Types.USER_AUTH_FAILURE:
      return AuthUserFailure(state, action);
    case Types.USER_LOGIN_FAILURE:
      return AuthUserFailure(state, action);
    case Types.USER_AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
}

export const authUserLogout = (state, isLogin) => {
  switch (isLogin) {
    case true:
      return (
        (state.users.isDone = false),
        (state.products.isDone = false),
        (state.user.isDone = false)
      );
    case false:
      return state;
    default:
      throw new Error(`Something went wrong.`);
  }
};
