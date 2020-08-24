import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import ShoppingCartList from "./ShoppingCartList";
import ErrorModal from "../common/UIElements/ErrorModal";
import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import * as actionTypes from "./shoppingCartActions/ShoppingCartActions";
import "./shoppingCartCss/ShoppingCartList.css";

const ShoppingCart = ({
  userId,
  token,
  loading,
  cart,
  isDone,
  loadCart,
  error,
}) => {
  const [errorMessage, setErrorNessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isDone) {
      loadCart(userId, token);
    }
  }, [isDone, loadCart, token, userId]);

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
    if (error) {
      setErrorNessage(error);
    }
  }, [error, loading]);

  // const onChangeQuantityHandler = (productInfoChanged) => {
  //   console.log(productInfoChanged.cart);
  // };

  const clearError = () => {
    setErrorNessage(null);
  };

  return (
    <>
      <ErrorModal error={errorMessage} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && (
        <div className="user-cart__wrapper">
          <ShoppingCartList
            items={cart}
            // onChangeProduct={onChangeQuantityHandler}
          />
        </div>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    cart: state.cart.items,
    loading: state.cart.loading,
    error: state.cart.error,
    isDone: state.cart.isDone,
    userId: state.auth.userId,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCart: (userId, token) =>
      dispatch(actionTypes.getCartRequest(userId, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
