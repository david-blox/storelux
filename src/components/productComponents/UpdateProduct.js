import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MIN_NUMBER,
  VALIDATOR_MINLENGTH,
  VALIDATOR_SELECT,
} from "../common/util/InputValidators";
import Input from "../common/FormElements/Input";
import Button from "../common/FormElements/Button";
import Card from "../common/UIElements/Card";
import ErrorModal from "../common/UIElements/ErrorModal";
import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import { useForm } from "../hooks/form-hook";
import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../common/context/auth-context";
import "./productsCss/ProductForm.css";

const UpdateProduct = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedProduct, setLoadedProduct] = useState();
  const [loadedCategories, setLoadedCategories] = useState();
  console.log(loadedProduct);
  console.log(loadedCategories);

  const productId = useParams().productId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      category: {
        value: "",
        isValid: false,
      },
      price: {
        value: "",
        isValid: false,
      },
      units: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  let moveToTop = useRef();

  useEffect(() => {
    const fetchCategories = async () => {
      const responseDataCategories = await sendRequest(
        "http://localhost:5000/api/categories"
      );
      setLoadedCategories(responseDataCategories.categories);
    };
    const fetchProduct = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/products/${productId}`
        );
        setLoadedProduct(responseData.product);
        setFormData(
          {
            title: {
              value: responseData.product.title,
              isValid: true,
            },
            category: {
              value: responseData.product.category,
              isValid: true,
            },
            price: {
              value: responseData.product.price,
              isValid: true,
            },
            units: {
              value: responseData.product.units,
              isValid: true,
            },
            description: {
              value: responseData.product.description,
              isValid: true,
            },
          },
          true
        );
        if (moveToTop.current) {
          window.scrollTo({
            behavior: "smooth",
            top: 0,
          });
        }
      } catch (err) {}
    };
    fetchProduct();
    fetchCategories();
  }, [sendRequest, productId, setFormData]);

  const updateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/products/${productId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          category: formState.inputs.category.value,
          price: formState.inputs.price.value,
          units: formState.inputs.units.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      history.push(`/${auth.userId}/products`);
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedProduct && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find product!</h2>
        </Card>
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedProduct && loadedCategories && (
        <form
          className="product-form"
          onSubmit={updateSubmitHandler}
          ref={moveToTop}
        >
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={loadedProduct.title}
            initialValid={true}
          />
          {/* <Input
            id="category"
            element="input"
            type="text"
            label="Category"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid Category."
            onInput={inputHandler}
            initialValue={loadedProduct.category}
            initialValid={true}
          /> */}
          <Input
            id="category"
            element="select"
            label="Category"
            type="select"
            value={loadedProduct.category}
            options={loadedCategories}
            validators={[VALIDATOR_SELECT("Select Category")]}
            errorText="Please enter a valid Category."
            onInput={inputHandler}
            initialValue={loadedProduct.category}
            initialValid={true}
          />
          <Input
            id="price"
            element="input"
            type="number"
            label="Price"
            validators={[VALIDATOR_MIN_NUMBER()]}
            errorText="Please enter a valid price number above zero."
            onInput={inputHandler}
            initialValue={loadedProduct.price}
            initialValid={true}
          />
          <Input
            id="units"
            element="input"
            type="number"
            label="Units"
            validators={[VALIDATOR_MIN_NUMBER()]}
            errorText="Please enter a valid price number above zero."
            onInput={inputHandler}
            initialValue={loadedProduct.units}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (at least 5 characters)."
            onInput={inputHandler}
            initialValue={loadedProduct.description}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PRODUCT
          </Button>
        </form>
      )}
    </>
  );
};

export default UpdateProduct;
