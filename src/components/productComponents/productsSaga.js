import { takeLatest, call, put, fork } from "redux-saga/effects";
import * as actions from "./productsActions";
import * as api from "../../api/products";
// import * as api from "../../api/api";

function* getProducts() {
  try {
    const result = yield call(api.getProducts);
    yield put(
      actions.getProductsSuccess({
        items: result.data,
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
    const product = yield call(api.createProduct, {
      name: action.payload.name,
      userId: action.payload.userId,
      category: action.payload.category,
      price: action.payload.price,
      units: action.payload.units,
    });
    yield call(getProducts);
    console.log(product.data);
  } catch (e) {
    yield put(
      actions.productError({
        error: "An error happend when trying to create new product",
      })
    );
  }
}

function* watchCreateProductRequest() {
  yield takeLatest(actions.Types.CREATE_PRODUCT_REQUEST, createProduct);
}

const productsSagas = [
  fork(watchGetProductsRequest),
  fork(watchCreateProductRequest),
];

export default productsSagas;
