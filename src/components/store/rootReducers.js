import { combineReducers } from "redux";
import productsReducer from "../productComponents/productsReducer";
import usersReducer, * as fromUsers from "../userComponents/userReducers/UserReducer";
import authReducer, * as fromAuth from "../userComponents/userReducers/AuthReducer";
import userReducer from "../userComponents/userReducers/userProfileReducer";
import categoriesReducer from "../categoriesComponents/categoriesReducer";
import userProductsReducer from "../productComponents/UserProductsReducer";
import createProductReducer from "../productComponents/NewProductReducer";

export default combineReducers({
  categories: categoriesReducer,
  products: productsReducer,
  users: usersReducer,
  auth: authReducer,
  user: userReducer,
  userProducts: userProductsReducer,
  newProduct: createProductReducer,
});

export const getUsersState = (state, isDone) =>
  fromUsers.getUsersState(state.users, isDone);

export const authUserLogout = (state, isLogin) =>
  fromAuth.authUserLogout(state, isLogin);

// export const checkUserState = (state, isDone) =>
//   formUser.checkUserState(state, isDone);
