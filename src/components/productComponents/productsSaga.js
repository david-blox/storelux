import { takeLatest, take, call, put, fork } from "redux-saga/effects";
import * as actions from "./productsActions";
import * as api from "../../api/products";

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
    yield put(actions.createProductSuccess());
    console.log(product);
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

// need to fix here
function* productsSuccess() {
  try {
    yield call(getProducts);
  } catch (e) {
    yield put(
      actions.productError({
        error: "An error happend when trying to success create new product",
      })
    );
  }
}

function* watchCreateProductSuccess() {
  yield takeLatest(actions.Types.CREATE_PRODUCT_SUCCESS, productsSuccess);
}

function* updateProduct(action) {
  // debugger;
  try {
    const product = yield call(api.updateProduct, {
      id: action.payload._id,
      name: action.payload.name,
      userId: action.payload.userId,
      category: action.payload.category,
      price: action.payload.price,
      units: action.payload.units,
    });
    const updatedData = yield call(api.getProducts);
    yield put(
      actions.updateProductSuccess({
        items: updatedData.data,
      })
    );
    // debugger;
    console.log(product);
  } catch (e) {
    yield put(
      actions.productError({
        error: "An error happend when trying to update product",
      })
    );
  }
}

function* watchUpdateProductRequest() {
  yield takeLatest(actions.Types.UPDATE_PRODUCT_REQUEST, updateProduct);
}

function* deleteProduct({ productId }) {
  try {
    yield call(api.deleteProduct, productId);
    yield put(actions.deleteProductSuccess());
    yield call(getProducts);
  } catch (e) {
    yield put(
      actions.productError({
        error: "An error happend when trying to delete product",
      })
    );
  }
}

function* watchDeleteProductRequest() {
  while (true) {
    const deleteAction = yield take(actions.Types.DELETE_PRODUCT_REQUEST);
    yield call(deleteProduct, {
      productId: deleteAction.payload.productId,
    });
  }
}

const productsSagas = [
  fork(watchGetProductsRequest),
  fork(watchCreateProductRequest),
  fork(watchCreateProductSuccess),
  fork(watchUpdateProductRequest),
  fork(watchDeleteProductRequest),
];

export default productsSagas;
