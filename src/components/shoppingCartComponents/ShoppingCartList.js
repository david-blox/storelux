import React, { useState, useEffect } from "react";

import Card from "../common/UIElements/Card";
import ShoppingCartItem from "./ShoppingCartItem";
import ShoppingCartSummary from "./ShoppingCartSummary";
import { connect } from "react-redux";

import { useHttpClient } from "../hooks/http-hook";
import ErrorModal from "../common/UIElements/ErrorModal";
import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import * as actionTypes from "./ShoppingCartActions";

const ShoppingCartList = (props) => {
  const [totalSum, setTotalSum] = useState(0);
  const [vat, setVat] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const { isLoading, error, clearError } = useHttpClient();

  let productPrice = props.items.map(
    (product) => product.price * product.quantity
  );
  // console.log(productPrice);
  // let productsQuantity = props.items.map((product) => product.quantity);
  // console.log(productsQuantity);

  useEffect(() => {
    let sum = 0;
    let currentVat = 0.17;
    let result;
    let total;
    productPrice.map((product) => (sum += product));
    result = (sum * currentVat).toFixed(2);
    total = (sum * currentVat + sum).toFixed(2);
    setVat(result);
    setTotalSum(sum);
    setTotalPrice(total);
  }, [productPrice]);

  // const onChangeQuantityHandler = (productInfoChanged) => {
  //   console.log(productInfoChanged);
  //   console.log(props);
  // };

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
            onChange={props.onChangeProduct}
            addQuantityHandler={() => props.onQuantityAdded(product.id)}
            removeQuantityHandler={props.onQuantityRemove}
          />
        ))}
      </ul>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="loadingSpinerPosion">
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
  console.log(state);
  return {
    product: state.product,
  };
};
const mapDispatchToProps = (disptach) => {
  return {
    onQuantityAdded: (id) =>
      disptach({ type: actionTypes.ADD_QUANTITY, productId: id }),
    onQuantityRemove: () => disptach({ type: actionTypes.REMOVE_QUANTITY }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartList);
