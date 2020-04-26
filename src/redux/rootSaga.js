import ProductsSagas from "../components/productComponents/productsSaga";
import UsersSagas from "../components/userComponents/usersSaga";
import CategoriesSaga from "../components/categoriesComponents/categoriesSaga";
import { all } from "redux-saga/effects";

const combineSagas = [...ProductsSagas, ...UsersSagas, ...CategoriesSaga];

export default function* rootSaga() {
  yield all({
    ...combineSagas,
  });
}
