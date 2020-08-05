import { takeLatest, call, put, fork } from "redux-saga/effects";
import * as actions from "./categoriesActions";
import * as api from "../api/categoriesApi";

function* getCategoriesRequest() {
  try {
    const responseData = yield call(api.getCategories);
    yield put(
      actions.getCategoriesSuccess({
        items: responseData.data.categories,
      })
    );
  } catch (e) {
    yield put(
      actions.getCategoriesFailure({
        error: "An error happend when trying get all categories",
      })
    );
  }
}

function* watchGetCategoriesRequest() {
  yield takeLatest(actions.Types.GET_CATEGORIES_REQUEST, getCategoriesRequest);
}

const categoriesSagas = [fork(watchGetCategoriesRequest)];

export default categoriesSagas;
