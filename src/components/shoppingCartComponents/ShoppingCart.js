import React, { useState, useEffect, useContext } from "react";
import ShoppingCartList from "./ShoppingCartList";
import ErrorModal from "../common/UIElements/ErrorModal";
import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../common/context/auth-context";
import "./shoppingCartCss/ShoppingCartList.css";

const ShoppingCart = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedCart, setLoadedCart] = useState();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/products/${auth.userId}/shoppingCart`,
          "GET",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );
        setLoadedCart(responseData.cart);
        console.log(responseData.cart);
      } catch (err) {}
    };
    fetchCart();
  }, [sendRequest, auth.userId, auth.token]);

  const onChangeQuantityHandler = (productInfoChanged) => {
    console.log(productInfoChanged.cart);
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedCart && (
        <div className="user-cart__wrapper">
          <ShoppingCartList
            items={loadedCart}
            onChangeProduct={onChangeQuantityHandler}
          />
        </div>
      )}
    </>
  );
};

export default ShoppingCart;
