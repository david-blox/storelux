import React from "react";

import Card from "../common/UIElements/Card";
import Button from "../common/FormElements/Button";
import "./shoppingCartCss/ShoppingCartSummary.css";

const ShoppingCartSummary = (props) => {
  return (
    <Card className="shopping-cart__sum">
      <h2 className="summary-header">Order Summary</h2>
      <div className="summary-subtotal">
        <div>Subtotal Price: </div>
        <div>{props.totalPrice + " $"}</div>
      </div>
      <div className="summary-vat">
        <div>Vat: </div>
        <div>{props.vat + " $"}</div>
      </div>
      <hr />
      <div className="summary-total__sum">
        <div>Total sum:</div>
        <div>{props.summary + " $"}</div>
      </div>
      <div className="order-btn">
        <Button buttonClass="order-now">Buy Now</Button>
      </div>
    </Card>
  );
};
export default ShoppingCartSummary;
