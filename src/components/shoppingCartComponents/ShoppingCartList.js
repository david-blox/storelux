import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Card from "../common/UIElements/Card";
import ShoppingCartItem from "./ShoppingCartItem";
import ShoppingCartSummary from "./ShoppingCartSummary";

import ErrorModal from "../common/UIElements/ErrorModal";
import LoadingSpinner from "../common/UIElements/LoadingSpinner";

const ShoppingCartList = (props) => {
  const { cartItems, cartSummaryloading } = props;
  const [totalSum, setTotalSum] = useState(0);
  const [vat, setVat] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const calculateTotalprice = (cartItems) => {
    let sum = 0;
    let currentVat = 0.17;
    let productPrice = cartItems.map(
      (product) => product.price * product.quantity
    );
    let result;
    let total;
    productPrice.map((product) => (sum += product));
    result = (sum * currentVat).toFixed(2);
    total = (sum * currentVat + sum).toFixed(2);
    setVat(result);
    setTotalSum(sum);
    setTotalPrice(total);
  };

  useEffect(() => {
    calculateTotalprice(cartItems);
    if (cartSummaryloading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [cartItems, cartSummaryloading]);

  const clearError = () => {
    setErrorMessage(null);
  };

  if (props.items.length === 0) {
    return (
      <div className="product-list center">
        <Card>
          <h2>No products Found in Cart.</h2>
        </Card>
      </div>
    );
  }
  return (
    <>
      <ul className="product-cart__list">
        {props.items.map((product) => (
          <ShoppingCartItem
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            creatorId={product.creator}
            category={product.category}
            price={product.price}
            quantity={product.quantity}
            units={product.units}
            description={product.description}
            // onChange={props.onChangeProduct}
            // addQuantityHandler={addQuantityHandler}
            // removeQuantityHandler={removeQuantityHandler}
          />
        ))}
      </ul>
      <ErrorModal error={errorMessage} onClear={clearError} />
      {isLoading && (
        <div className="loadingSpinerPosition">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && (
        <ShoppingCartSummary
          totalPrice={totalSum}
          vat={vat}
          summary={totalPrice}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.items,
    cartSummaryloading: state.cart.cartSummary.loading,
  };
};

export default connect(mapStateToProps)(ShoppingCartList);
