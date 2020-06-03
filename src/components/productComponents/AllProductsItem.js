import React, { useState } from "react";

import Modal from "../common/UIElements/Modal";
import Button from "../common/FormElements/Button";
import Avatar from "../common/UIElements/Avatar";
import "./productsCss/AllProductsItem.css";

const AllProductsItem = (props) => {
  const [showProduct, setShowProduct] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const openProductHandler = () => setShowProduct(true);

  const closeProductHandler = () => setShowProduct(false);

  // number of available units in current product
  const units = props.units;
  const addQuantityHandler = () => {
    if (quantity !== units) {
      setQuantity(quantity + 1);
    }
  };

  const removeQuantityHandler = () => {
    if (quantity) {
      setQuantity(quantity - 1);
    }
  };

  const addProductToCart = () => {
    console.log("ADDING TO CART...");
  };

  return (
    <>
      <Modal
        show={showProduct}
        onCancel={closeProductHandler}
        header={props.title}
        headerClass="product-modal_header"
        contentClass="product-item__modal-content"
        footerClass="product-item__modal-actions"
        footer={
          <>
            <Button danger onClick={closeProductHandler}>
              CLOSE
            </Button>
            <Button onClick={addProductToCart}>ADD TO CART</Button>
          </>
        }
      >
        <div className="info-container">
          <div className="product-modal_image">
            <Avatar
              className="image_radius"
              image={props.image}
              alt={props.title}
            />
          </div>
          <div className="product-modal_content">
            <p>{props.description}</p>
            <div className="product-modal_box">
              <div>
                <h3>Price: {props.price + "$"}</h3>
                <p>Units Available: {props.units}</p>
              </div>
              <div className="product-modal_qun">
                <button className="btn_qun" onClick={addQuantityHandler}>
                  <div className="plus">+</div>
                </button>
                <div>{quantity}</div>
                <button className="btn_qun" onClick={removeQuantityHandler}>
                  <div className="minus">-</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <tr key={props.id}>
        <td className="td_product_image ">
          <Avatar
            className="image_radius"
            image={props.image}
            alt={props.title}
          />
        </td>
        <td>{props.title}</td>
        <td>{props.creatorId}</td>
        <td>{props.category}</td>
        <td>{props.price + "$"}</td>
        <td>{props.units}</td>
        <td className="btn_td">
          <Button onClick={openProductHandler}>VIEW</Button>
        </td>
      </tr>
    </>
  );
};

export default AllProductsItem;
