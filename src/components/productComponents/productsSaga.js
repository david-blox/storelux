import { takeLatest, call, put, fork, take } from "redux-saga/effects";
import * as actions from "./productsActions";
import * as api from "../api/productsApi";

function* getProducts() {
  try {
    const result = yield call(api.getProducts);
    yield put(
      actions.getProductsSuccess({
        items: result.data.products,
      })
    );
    console.log(result);
  } catch (e) {
    yield put(
      actions.productError({
        error: "An error happend when trying to get Products",
      })
    );
  }
}

function* watchGetProductsRequest() {
  yield takeLatest(actions.Types.GET_PRODUCTS_REQUEST, getProducts);
}

function* createProduct(action) {
  try {
    const responseData = yield call(api.createProduct, {
      token: action.token,
      formData: action.formData,
    });
    yield put(actions.createProductSuccess(responseData.data.product));
    console.log(responseData);
  } catch (e) {
    yield put(
      actions.createProductFailure({
        error: "An error happend when tring to add new product",
      })
    );
  }
}

function* watchCreateProductRequest() {
  yield takeLatest(actions.Types.CREATE_PRODUCT_REQUEST, createProduct);
}

function* getUserProducts(action) {
  try {
    const responseData = yield call(api.getUserProducts, {
      userId: action.userId,
    });
    yield put(
      actions.getUserProductsSuccess({
        items: responseData.data.products,
      })
    );
    console.log(responseData);
  } catch (e) {
    yield put(
      actions.getUserProductsFailure({
        error: "Could not get users products, Please try again.",
      })
    );
  }
}

function* watchGetUserProductsRequest() {
  yield takeLatest(actions.Types.GET_USER_PRODUCTS_REQUEST, getUserProducts);
}

function* deleteProductRequest({ token, productId, userId }) {
  try {
    yield call(api.deleteProduct, token, productId);
    yield put(actions.deleteProductSuccess());

    yield call(getUserProducts, { userId });
  } catch (e) {
    yield put(
      actions.deleteProductFailure({
        error: "Could not Delete products, Please try again.",
      })
    );
  }
}

function* watchDeleteProductRequest() {
  while (true) {
    const deleteAction = yield take(actions.Types.DELETE_PRODUCT_REQUEST);
    yield call(deleteProductRequest, {
      token: deleteAction.token,
      productId: deleteAction.productId,
      userId: deleteAction.userId,
    });
  }
}

const productsSagas = [
  fork(watchGetProductsRequest),
  fork(watchCreateProductRequest),
  fork(watchGetUserProductsRequest),
  fork(watchDeleteProductRequest),
];

export default productsSagas;
