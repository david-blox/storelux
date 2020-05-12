import React, { useState } from "react";
import { Link } from "react-router-dom";

import Modal from "../common/UIElements/Modal";
import "./productsCss/ProductItem.css";

const ProductItem = (props) => {
  const [showProduct, setShowProduct] = useState(false);

  const openProductHandler = () => setShowProduct(true);

  const closeProductHandler = () => setShowProduct(false);

  return (
    <>
      <Modal
        show={showProduct}
        onCancel={closeProductHandler}
        header={props.name}
        className="display_box"
        contentClass="product-item__modal-content"
        footerClass="product-item__modal-actions "
        footer={
          <>
            <button className="btn btn-outline-success add_to_cart_btn">
              Add to Cart
            </button>
            <button
              className="btn btn-outline-info"
              onClick={closeProductHandler}
            >
              CLOSE
            </button>
          </>
        }
      >
        <div className="product-window">
          {/* will add image and more details insde */}
          <h2>Product INFO!</h2>
          <div>{props.userName}</div>
          <div>{props.price}</div>
          <div>{props.units}</div>
        </div>
      </Modal>
      <tr key={props.id}>
        <td>
          <Link to={`/product/${props.id}`}>{props.name}</Link>
        </td>
        <td>{props.userName}</td>
        <td>{props.category}</td>
        <td>{props.price}</td>
        <td>{props.units}</td>
        <td>
          <div style={{ display: "flex" }}>
            <button
              className="btn btn-outline-info"
              style={{ marginRight: "1rem" }}
              onClick={openProductHandler}
            >
              View
            </button>
            <button className="btn btn-outline-danger" onClick={props.onClick}>
              Delete
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default ProductItem;
