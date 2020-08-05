import * as actionTypes from "./ShoppingCartActions";

const initialState = {
  product: {
    quantity: 0,
    price: 199,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_QUANTITY:
      return {
        ...state,
        product: {
          ...state.product,
          quantity: state.product.quantity + 1,
        },
      };
    case actionTypes.REMOVE_QUANTITY:
      return {
        ...state,
        product: {
          ...state.product,
          quantity: state.product.quantity - 1,
        },
      };
    default:
      return state;
  }
};

export default reducer;
