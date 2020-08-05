export const Types = {
  GET_CATEGORIES_REQUEST: "categories/GET_CATEGORIES.REQUEST",
  GET_CATEGORIES_SUCCESS: "categories/GET_CATEGORIES.SUCCESS",
  GET_CATEGORIES_FAILURE: "categories/GET_CATEGORIES.FAILURE",
};

export const getCategoriesRequest = () => ({
  type: Types.GET_CATEGORIES_REQUEST,
});

export const getCategoriesSuccess = (items) => ({
  type: Types.GET_CATEGORIES_SUCCESS,
  categories: items,
});

export const getCategoriesFailure = (error) => ({
  type: Types.GET_CATEGORIES_FAILURE,
  error: error,
});
