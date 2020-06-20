import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Input from "../common/FormElements/Input";
import Button from "../common/FormElements/Button";
import ErrorModal from "../common/UIElements/ErrorModal";
import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import ImageUpload from "../common/FormElements/ImageUpload";
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
      image: {
        value: null,
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
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("category", formState.inputs.category.value);
      formData.append("price", formState.inputs.price.value);
      formData.append("units", formState.inputs.units.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("creator", auth.userId);
      formData.append("image", formState.inputs.image.value);
      await sendRequest("http://localhost:5000/api/products", "POST", formData);
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
          <Input
            id="category"
            element="select"
            label="Category"
            type="select"
            value="Select Category"
            options={loadedCategories.map((category) => ({
              name: category.name,
              id: category.id,
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
          <ImageUpload
            id="image"
            classImage="imagePreview"
            onInput={inputHandler}
            errorText="Please provide an image."
          />
          <Button
            type="submit"
            buttonClass="btnProductSubmit"
            disabled={!formState.isValid}
          >
            ADD PRODUCT
          </Button>
        </form>
      )}
    </>
  );
};

export default NewProduct;
