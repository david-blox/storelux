import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import AllProductsList from "./AllProductsList";
import ErrorModal from "../common/UIElements/ErrorModal";
import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import * as productsAction from "./productsActions";
import * as usersAction from "../userComponents/usersActions/UserActions";

const AllProducts = ({
  loadProducts,
  loadUsers,
  products,
  users,
  usersError,
  productsError,
  loadingProducts,
  loadingUsers,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    loadUsers();
    loadProducts();
  }, [loadProducts, loadUsers]);

  useEffect(() => {
    if (loadingProducts || loadingUsers) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
    if (usersError) {
      setErrorMessage(usersError.error);
    }
    if (productsError) {
      setErrorMessage(productsError.error);
    }
  }, [loadingProducts, loadingUsers, productsError, usersError]);

  const clearError = () => {
    setErrorMessage(null);
  };

  return (
    <>
      <ErrorModal error={errorMessage} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && <AllProductsList products={products} users={users} />}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products.items,
    loadingProducts: state.products.loading,
    users: state.users.items,
    loadingUsers: state.users.loading,
    usersError: state.users.error,
    productsError: state.products.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadProducts: () => dispatch(productsAction.getProductsRequest()),
    loadUsers: () => dispatch(usersAction.getUsersRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
