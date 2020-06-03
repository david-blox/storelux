import React, { useState, useEffect } from "react";

import AllProductsList from "./AllProductsList";
import ErrorModal from "../common/UIElements/ErrorModal";
import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import { useHttpClient } from "../hooks/http-hook";

const AllProducts = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedProducts, setLoadedProducts] = useState();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/products"
        );

        setLoadedProducts(responseData.products);
        console.log(responseData.products);
      } catch (err) {}
    };
    const fetchUsers = async () => {
      try {
        const responseUsers = await sendRequest(
          "http://localhost:5000/api/users"
        );
        setLoadedUsers(responseUsers.users);
        console.log(responseUsers.users);
      } catch (err) {}
    };
    fetchProducts();
    fetchUsers();
  }, [sendRequest]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedProducts && loadedUsers && (
        <AllProductsList items={loadedProducts} users={loadedUsers} />
      )}
    </>
  );
};

export default AllProducts;
