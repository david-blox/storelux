import React, { useState, useContext } from "react";

import Card from "../common/UIElements/Card";
import Button from "../common/FormElements/Button";
import Modal from "../common/UIElements/Modal";
import ErrorModal from "../common/UIElements/ErrorModal";
import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import { AuthContext } from "../common/context/auth-context";
import { useHttpClient } from "../hooks/http-hook";
import "./productsCss/ProductItem.css";

const ProductItem = (props) => {
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [showProduct, setShowProduct] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openProductHandler = () => setShowProduct(true);

  const closeProductHandler = () => setShowProduct(false);

  const showDeleteHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/products/${props.id}`,
        "DELETE"
      );
      console.log(props.id);

      // sending the requested product id in order to filter the new products array
      //and display the products without the deleted product
      props.onDelete(props.id);
    } catch (err) {}
  };
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showProduct}
        onCancel={closeProductHandler}
        header={props.title}
        contentClass="product-item__modal-content"
        footerClass="product-item__modal-actions"
        footer={<Button onClick={closeProductHandler}>CLOSE</Button>}
      >
        <div className="info-container">
          <h2>PRODUCT!!</h2>
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="product-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </>
        }
      >
        <p>
          Do you want to proceed and delete this product? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <li className="product-item">
        <Card className="product-item__content">
          {isLoading && <LoadingSpinner asOverlay />}

          <div className="product-item__header">
            <h2>{props.title}</h2>
          </div>
          <div className="product-item__info-wrapper">
            <div className="product-item__info">
              <h4>Category: {props.category}</h4>
              <h4>Price:</h4>
              <p>{`${props.price} $`}</p>
              <h4>Units Available:</h4>
              <p>
                {`${props.units}`} {props.units === 1 ? "unit" : "units"}
              </p>
              <h4>Description:</h4>
              <p>{props.description}</p>
            </div>
            <div className="product-item__image">
              <img
                src={`http://localhost:5000/${props.image}`}
                alt={props.title}
              />
            </div>
          </div>
          <div className="product-item__actions">
            <Button inverse onClick={openProductHandler}>
              VIEW PRODUCT
            </Button>
            {auth.userId === props.creatorId && (
              <Button to={`/product/${props.id}`}>EDIT</Button>
            )}
            {auth.userId === props.creatorId && (
              <Button danger onClick={showDeleteHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default ProductItem;
