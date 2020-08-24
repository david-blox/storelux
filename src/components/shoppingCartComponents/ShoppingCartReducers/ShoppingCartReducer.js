import { Types } from "../shoppingCartActions/ShoppingCartActions";
import { Types as addToCartActions } from "../../productComponents/productsActions/addToCartActions";
import { updateObject } from "../../store/utility";

const initialState = {
  items: [],
  error: null,
  loading: false,
  isDone: false,
  product: {
    item: [],
    productLoading: false,
    productError: null,
  },
  cartSummary: {
    totalPrice: null,
    vat: null,
    totalSum: null,
  },
};

const getCartStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    isDone: false,
  });
};

const getCartSuccess = (state, action) => {
  let sum = 0;
  let calcVat;
  let total;
  let currentVat = 0.17;
  let totalPrice = action.cart.map((item) => item.price * item.quantity);
  totalPrice.map((item) => (sum += item));
  calcVat = (sum * currentVat).toFixed(2);
  total = (sum * currentVat + sum).toFixed(2);
  console.log(totalPrice);
  return updateObject(state, {
    items: action.cart,
    error: null,
    loading: false,
    isDone: true,
    product: {
      productLoading: false,
    },
    cartSummary: {
      totalPrice: sum,
      vat: calcVat,
      totalSum: total,
    },
  });
};

const getCartFailure = (state, action) => {
  return updateObject(state, {
    error: action.error.error,
  });
};

const addProductQuantity = (state, action) => {
  const id = action.productId;
  let findProduct = state.items.find((item) => item.id === id);
  let updatedProduct = updateObject(findProduct, {
    quantity: (findProduct.quantity += 1),
  });

  const updatedItems = updateObject(state, {
    product: {
      item: updatedProduct,
    },
  });
  return updateObject(state, updatedItems);
};

const removeProductQuantity = (state, action) => {
  const id = action.productId;
  let findProduct = state.items.find((item) => item.id === id);
  let updatedProduct = updateObject(findProduct, {
    quantity: (findProduct.quantity -= 1),
  });
  const updatedItems = updateObject(state, {
    product: {
      item: updatedProduct,
    },
  });
  return updateObject(state, updatedItems);
};

const updateProductQuantityRequest = (state, action) => {
  return updateObject(state, {
    product: {
      item: state.product.item,
      productLoading: true,
    },
  });
};
const updateProductQuantitySuccess = (state, action) => {
  console.log(state);

  return updateObject(state, {
    product: {
      item: state.product.item,
      productLoading: false,
    },
  });
};

const updateProductQuantityFailure = (state, action) => {
  return updateObject(state, {
    product: {
      productError: action.error,
    },
  });
};

const deleteProductCartRequest = (state, action) => {
  return updateObject(state, {
    product: {
      productLoading: true,
    },
  });
};

const addingProductsToCart = (state, action) => {
  return updateObject(state, {
    isDone: false,
  });
};

export default function shoppingCartReducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_CART_REQUSET:
      return getCartStart(state, action);
    case Types.GET_CART_SUCCESS:
      return getCartSuccess(state, action);
    case Types.GET_CART_FAILURE:
      return getCartFailure(state, action);
    case Types.ADD_PRODUCT_QUANTITY:
      return addProductQuantity(state, action);
    case Types.REMOVE_PRODUCT_QUANTITY:
      return removeProductQuantity(state, action);
    case Types.SET_PRODUCT_QUANTITY_REQUEST:
      return updateProductQuantityRequest(state, action);
    case Types.SET_PRODUCT_QUANTITY_SUCCESS:
      return updateProductQuantitySuccess(state, action);
    case Types.SET_PRODUCT_QUANTITY_FAILURE:
      return updateProductQuantityFailure(state, action);
    case Types.DELETE_FROM_CART_REQUEST:
      return deleteProductCartRequest(state, action);
    case addToCartActions.ADD_TO_CART_REQUEST:
      return addingProductsToCart(state, action);
    default:
      return state;
  }
}
