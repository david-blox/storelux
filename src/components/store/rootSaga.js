import { all } from "redux-saga/effects";
import productsSagas from "../productComponents/productsSaga";
import usersSagas from "../userComponents/userSagas/UserSaga";
import authSagas from "../userComponents/userSagas/authSaga";
import categoriesSagas from "../categoriesComponents/categoriesSaga";

const combineSagas = [
  ...productsSagas,
  ...usersSagas,
  ...authSagas,
  ...categoriesSagas,
];

export default function* rootSaga() {
  yield all({
    ...combineSagas,
  });
}
