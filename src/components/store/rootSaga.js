import { all } from "redux-saga/effects";
import productsSagas from "../productComponents/productsSaga/productsSaga";
import addTocartSagas from "../productComponents/productsSaga/addToCartSaga";
import usersSagas from "../userComponents/userSagas/UserSaga";
import authSagas from "../userComponents/userSagas/authSaga";
import categoriesSagas from "../categoriesComponents/categoriesSaga";
import cartSagas from "../shoppingCartComponents/shoppingCartSagas/ShoppingCartSaga";

const combineSagas = [
  ...productsSagas,
  ...addTocartSagas,
  ...usersSagas,
  ...authSagas,
  ...categoriesSagas,
  ...cartSagas,
];

export default function* rootSaga() {
  yield all({
    ...combineSagas,
  });
}
