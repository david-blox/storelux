export const Types = {
  GET_USERS_REQUEST: "users/GET_USERS.REQUEST",
  GET_USERS_SUCCESS: "users/GET_USERS.SUCCESS",
  GET_USERS_FAILURE: "users/GET_USERS.FAILURE",
  CREATE_USER_REQUEST: "users/CREATE_USERS.REQUEST",
  DELETE_USER_REQUEST: "users/DELETE_USER.REQUEST",
  USER_SIGNUP_REQUEST: "users/USER_SIGNUP.REQUEST",
  USER_SIGNUP_SUCCESS: "users/USER_SIGNUP.SUCCESS",
  USER_SIGNUP_FAILURE: "users/USER_SIGNUP.FAILURE",
};

export const getUsersRequest = () => ({
  type: Types.GET_USERS_REQUEST,
});

export const getUsersSuccess = ({ items }) => ({
  type: Types.GET_USERS_SUCCESS,
  payload: {
    items,
  },
});

export const signUpUserRequest = ({
  firstName,
  lastName,
  email,
  password,
}) => ({
  type: Types.USER_SIGNUP_REQUEST,
  payload: {
    firstName,
    lastName,
    email,
    password,
  },
});

export const signUpUserSuccess = () => ({
  type: Types.USER_SIGNUP_SUCCESS,
});

export const userError = ({ error }) => ({
  type: Types.GET_USERS_FAILURE,
  payload: {
    error,
  },
});
export const userSignUpError = ({ error }) => ({
  type: Types.USER_SIGNUP_FAILURE,
  payload: {
    error,
  },
});
