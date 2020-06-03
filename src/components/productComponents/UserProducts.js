import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductList from "./ProductList";
import ErrorModal from "../common/UIElements/ErrorModal";
import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import { useHttpClient } from "../hooks/http-hook";

const UserProducts = () => {
  const [loadedProducts, setLoadedProducts] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/products/user/${userId}`
        );
        setLoadedProducts(responseData.products);
      } catch (err) {}
    };
    fetchProducts();
  }, [sendRequest, userId]);

  const productDeletedHandler = (deletedProductId) => {
    setLoadedProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== deletedProductId)
    );
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedProducts && (
        <ProductList
          items={loadedProducts}
          onDeleteProduct={productDeletedHandler}
        />
      )}
    </>
  );
};

export default UserProducts;
