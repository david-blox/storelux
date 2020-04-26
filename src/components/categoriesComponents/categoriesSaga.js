import { takeLatest, call, fork, put } from "redux-saga/effects";
import * as actions from "./categoriesActions";
import * as api from "../../api/categories";

function* getCategories() {
  try {
    const resultCategories = yield call(api.getCategories);
    yield put(
      actions.getCategoriesSuccess({
        items: resultCategories.data,
      })
    );
    console.log(resultCategories);
  } catch (e) {
    yield put(
      actions.categoryError({
        error: "An error happend when trying to get Categories",
      })
    );
  }
}

function* watchGetCategoriesRequest() {
  yield takeLatest(actions.Types.GET_CATEGORIES_REQUEST, getCategories); //takeEvery it works like while(true)
}

const categorySagas = [fork(watchGetCategoriesRequest)];

export default categorySagas;
