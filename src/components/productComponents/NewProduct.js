import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Input from "../common/FormElements/Input";
import Button from "../common/FormElements/Button";
import ErrorModal from "../common/UIElements/ErrorModal";
import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MIN_NUMBER,
  VALIDATOR_SELECT,
} from "../common/util/InputValidators";
import { useForm } from "../hooks/form-hook";
import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../common/context/auth-context";
import "./productsCss/ProductForm.css";

const NewProduct = () => {
  const auth = useContext(AuthContext);
  const [loadedCategories, setLoadedCategories] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
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

  const history = useHistory();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const resposeData = await sendRequest(
          "http://localhost:5000/api/categories"
        );

        setLoadedCategories(resposeData.categories);
      } catch (err) {}
    };
    fetchCategories();
  }, [sendRequest]);

  const productSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        "http://localhost:5000/api/products",
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
          category: formState.inputs.category.value,
          price: formState.inputs.price.value,
          units: formState.inputs.units.value,
          description: formState.inputs.description.value,
          creator: auth.userId,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      history.push("/");
    } catch (err) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedCategories && (
        <form className="product-form" onSubmit={productSubmitHandler}>
          {isLoading && <LoadingSpinner asOverlay />}
          <h2>Add New Product</h2>
          <Input
            id="title"
            type="text"
            element="input"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
          />
          {/* <Input
          id="category"
          type="text"
          element="input"
          label="Category"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid Category."
          onInput={inputHandler}
        /> */}
          <Input
            id="category"
            element="select"
            label="Category"
            type="select"
            value="Select Category"
            options={loadedCategories.map((category) => ({
              name: category.name,
              id: category.name,
            }))}
            validators={[VALIDATOR_SELECT("Select Category")]}
            errorText="Please enter a valid Category."
            onInput={inputHandler}
          />
          <Input
            id="price"
            type="number"
            element="input"
            label="Price"
            validators={[VALIDATOR_MIN_NUMBER()]}
            errorText="Please enter a valid price number above zero."
            onInput={inputHandler}
          />
          <Input
            id="units"
            type="number"
            element="input"
            label="Units"
            validators={[VALIDATOR_MIN_NUMBER()]}
            errorText="Please enter a valid number for units above zero."
            onInput={inputHandler}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (at least 5 characters)."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            ADD PRODUCT
          </Button>
        </form>
      )}
    </>
  );
};

export default NewProduct;
