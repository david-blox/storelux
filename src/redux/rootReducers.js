import { combineReducers } from "redux";
import ProductsReducer from "../components/productComponents/productsReducer";
import UsersReducer from "../components/userComponents/userReducer";
import CategoriesReducer from "../components/categoriesComponents/categoriesReducer";

export default combineReducers({
  products: ProductsReducer,
  users: UsersReducer,
  categories: CategoriesReducer,
});
