import { takeLatest, call, put, fork, take } from "redux-saga/effects";
import * as actions from "../shoppingCartActions/ShoppingCartActions";
import * as api from "../../api/cartApi";
import { toast } from "react-toastify";

function* getCartByUserId(action) {
  try {
    const responseData = yield call(api.getCartByUserId, {
      userId: action.userId,
      token: action.token,
    });
    yield put(actions.getCartSuccess(responseData.data.cart));
    console.log(responseData);
  } catch (e) {
    yield put(
      actions.getCartFailure({
        error:
          "An error happend, Could't get cart from server, please try again.",
      })
    );
  }
}
function* watchGetCartRequest() {
  yield takeLatest(actions.Types.GET_CART_REQUSET, getCartByUserId);
}

function* updateProductInCart(action) {
  try {
    const responseData = yield call(api.updateProductQuantity, {
      userId: action.payload.userId,
      token: action.payload.token,
      productId: action.payload.productId,
      quantity: action.payload.quantity,
    });
    yield put(actions.setProductQuantitySuccess());
    console.log(responseData);
  } catch (e) {
    yield put(
      actions.setProductQuantityFailure({
        error: "Could not update product, please try again.",
      })
    );
  }
}

function* watchUpdateProductCartRequest() {
  yield takeLatest(
    actions.Types.SET_PRODUCT_QUANTITY_REQUEST,
    updateProductInCart
  );
}

function* deleteProductCart({ token, userId, productId }) {
  try {
    yield call(api.deleteProductFromCart, token, userId, productId);
    yield put(actions.deleteProductFromCartSuccess(productId));
    yield call(getCartByUserId, { userId, token });

    yield toast.info("Product deleted successfuly from cart.");
  } catch (e) {
    yield put(
      actions.deleteProductFromCartFailure({
        error: "Could not delete product from cart, please try again.",
      })
    );
  }
}

function* watchDeleteProductFromCartRequest() {
  while (true) {
    const deleteAction = yield take(actions.Types.DELETE_FROM_CART_REQUEST);
    yield call(deleteProductCart, {
      token: deleteAction.token,
      userId: deleteAction.userId,
      productId: deleteAction.productId,
    });
  }
}

const cartSagas = [
  fork(watchGetCartRequest),
  fork(watchUpdateProductCartRequest),
  fork(watchDeleteProductFromCartRequest),
];

export default cartSagas;
