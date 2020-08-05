import React, { useState, useContext, useEffect } from "react";

import Modal from "../common/UIElements/Modal";
import Button from "../common/FormElements/Button";
import Avatar from "../common/UIElements/Avatar";
import ErrorModal from "../common/UIElements/ErrorModal";
import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../common/context/auth-context";
import "./productsCss/AllProductsItem.css";

const AllProductsItem = (props) => {
  const auth = useContext(AuthContext);
  const [showProduct, setShowProduct] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [quantity, setQuantity] = useState(1);
  const [productId, setProductId] = useState();
  const [title, setTitle] = useState();
  const [category, seCategory] = useState();
  const [price, setPrice] = useState();
  const [units, setUnits] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();

  const openProductHandler = () => setShowProduct(true);

  const closeProductHandler = () => setShowProduct(false);

  // number of available units in current product

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

  useEffect(() => {
    setProductId(props.id);
    setQuantity(quantity);
    setTitle(props.title);
    setPrice(props.price);
    setUnits(props.units);
    setImage(props.image);
    setDescription(props.description);

    seCategory(props.category);
  }, [
    props.category,
    props.description,
    props.id,
    props.image,
    props.price,
    props.title,
    props.units,
    quantity,
  ]);

  const addProductToCart = async (event) => {
    event.preventDefault();
    setShowProduct(false);

    try {
      let cart = await sendRequest(
        `http://localhost:5000/api/products/${auth.userId}/shoppingCart`,
        "POST",
        JSON.stringify({
          productId,
          quantity,
          title,
          category,
          price,
          units,
          description,
          image,
        }),
        {
          Authorization: "Bearer " + auth.token,
          "Content-Type": "application/json",
        }
      );
      console.log(cart.cart.products);
      console.log(auth.userId);
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner asOverlay />
      </div>
    );
  }

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
      <ErrorModal error={error} onClear={clearError} />

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
