export const Types = {
  GET_USERS_REQUEST: "users/GET_USERS.REQUEST",
  GET_USERS_SUCCESS: "users/GET_USERS.SUCCESS",
  GET_USERS_FAILURE: "users/GET_USERS.FAILURE",
  CREATE_USER_REQUEST: "users/CREATE_USERS.REQUEST",
  DELETE_USER_REQUEST: "users/DELETE_USER.REQUEST",
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

export const userError = ({ error }) => ({
  type: Types.GET_USERS_FAILURE,
  payload: {
    error,
  },
});
