import { combineReducers } from "redux";
import productsReducer from "../productComponents/productsReducers/ProductsReducer";
import usersReducer, * as fromUsers from "../userComponents/userReducers/UserReducer";
import authReducer, * as fromAuth from "../userComponents/userReducers/AuthReducer";
import userReducer from "../userComponents/userReducers/userProfileReducer";
import categoriesReducer from "../categoriesComponents/categoriesReducer";
import userProductsReducer, * as formProducts from "../productComponents/productsReducers/UserProductsReducer";
import createProductReducer from "../productComponents/productsReducers/NewProductReducer";
import updateProductReducer from "../productComponents/productsReducers/UpdateProductReducer";
import addProductToCartReducer from "../productComponents/productsReducers/AddProductToCartReducer";
import cartReducer from "../shoppingCartComponents/ShoppingCartReducers/ShoppingCartReducer";
import { Types } from "../userComponents/usersActions/authActions";

const rootReducer = combineReducers({
  categories: categoriesReducer,
  products: productsReducer,
  users: usersReducer,
  auth: authReducer,
  user: userReducer,
  userProducts: userProductsReducer,
  newProduct: createProductReducer,
  updateProduct: updateProductReducer,
  addToCart: addProductToCartReducer,
  cart: cartReducer,
});

export default (state, action) =>
  rootReducer(
    action.type === Types.USER_AUTH_INITIATE_LOGOUT ? undefined : state,
    action
  );

export const getUsersState = (state, isDone) =>
  fromUsers.getUsersState(state.users, isDone);

export const getUserProductsChange = (state, hasChanged) =>
  formProducts.getUserProductsChange(state.userProducts, hasChanged);

export const authUserLogout = (state, isLogin) =>
  fromAuth.authUserLogout(state, isLogin);
