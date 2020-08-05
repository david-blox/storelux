import React, { useState, useEffect, useContext } from "react";

import Card from "../common/UIElements/Card";
import Button from "../common/FormElements/Button";
import ErrorModal from "../common/UIElements/ErrorModal";
import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../common/context/auth-context";
import bin from "../../images/bin.png";
import "./shoppingCartCss/ShoppingCartItem.css";

const ShoppingCartItem = (props) => {
  const auth = useContext(AuthContext);
  const [quantity, setQuantity] = useState(props.quantity);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const units = props.units;
  const productId = props.id;
  const addQuantityHandler = () => {
    if (props.quantity !== units) {
      setQuantity(quantity + 1);
    }
  };

  const removeQuantityHandler = () => {
    if (props.quantity) {
      setQuantity(quantity - 1);
    }
  };

  // useEffect(() => {
  //   props.onChange({ quantity, productId });
  // }, [quantity, props, productId]);

  // useEffect(() => {
  //   const updateQquantity = async () => {
  //     try {
  //       const responseData = await sendRequest(
  //         `http://localhost:5000/api/products/${auth.userId}/shoppingCart`,
  //         "PATCH",
  //         JSON.stringify({
  //           productId,
  //           quantity,
  //         }),
  //         {
  //           Authorization: "Bearer " + auth.token,
  //           "Content-Type": "application/json",
  //         }
  //       );
  //       setQuantity(quantity);
  //       props.onChange(responseData);
  //     } catch (err) {}
  //   };
  //   updateQquantity();
  // }, [quantity, productId, sendRequest, auth.token, auth.userId, props]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="loadingSpinerPosion">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && (
        <li className="product-cart__item">
          <Card className="product-cart__content">
            <div className="product-cart__description">
              <div className="product-cart__image">
                <img src={props.image} alt={props.title} />
              </div>
              <div className="product-cart__info">
                <h4>{props.title}</h4>
                <p>Category: {props.category}</p>
                <p>{props.description}</p>
                <h3>Price: {`${props.price} $`}</h3>
              </div>
            </div>
            <div className="product-cart__sum">
              <div className="product-cart_qun">
                <div className="product-cart_qun-content">
                  <button className="btn_qun" onClick={props.addQuantityHandler}>
                    <div className="plus">+</div>
                  </button>
                  <div>{quantity}</div>
                  <button className="btn_qun" onClick={props.removeQuantityHandler}>
                    <div className="minus">-</div>
                  </button>
                </div>
                <button className="product-cart__delete-item">
                  <img src={bin} alt="delete" />
                </button>
              </div>
              <Button buttonClass="product-purchase">Purchase Item</Button>
            </div>
          </Card>
        </li>
      )}
    </>
  );
};

export default ShoppingCartItem;
