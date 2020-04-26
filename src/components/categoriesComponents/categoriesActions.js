export const Types = {
  GET_CATEGORIES_REQUEST: "categories/GET_CATEGORIES.REQUEST",
  GET_CATEGORIES_SUCCESS: "categories/GET_CATEGORIES.SUCCESS",
  GET_CATEGORIES_FAILURE: "categories/GET_CATEGORIES.FAILURE",
  CREATE_CATEGORIES_REQUEST: "categories/CREATE_CATEGORIES.REQUEST",
  DELETE_CATEGORIES_REQUEST: "categories/DELETE_CATEGORIES.REQUEST",
};

export const getCategoriesRequest = () => ({
  type: Types.GET_CATEGORIES_REQUEST,
});

export const getCategoriesSuccess = ({ items }) => ({
  type: Types.GET_CATEGORIES_SUCCESS,
  payload: {
    items,
  },
});

export const categoryError = ({ error }) => ({
  type: Types.GET_CATEGORIES_FAILURE,
  payload: {
    error,
  },
});
