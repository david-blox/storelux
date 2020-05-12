import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as productAction from "./productsActions";
import * as usersAction from "../userComponents/usersActions";
import * as categoriesAction from "../categoriesComponents/categoriesActions";
import ProductForm from "./ProductForm";
import { newProduct } from "./newProductFormat";

function ManageProductPage({
  products,
  users,
  categories,
  loadProducts,
  loadCategories,
  loadUsers,
  saveProduct,
  updateRequest,
  history,
  ...props
}) {
  const [product, setProduct] = useState({ ...props.product });
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadProducts();
    loadUsers();
    loadCategories();
  }, [loadCategories, loadProducts, loadUsers]);

  function handleChange(event) {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === "userId" ? parseInt(value, 10) : value,
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    product._id ? updateRequest(product) : saveProduct(product);
    history.push("/products");
  }

  return (
    <ProductForm
      product={product}
      users={users.items}
      categories={categories.items}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
}

ManageProductPage.propTypes = {
  product: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  loadProducts: PropTypes.func.isRequired,
  loadUsers: PropTypes.func.isRequired,
  loadCategories: PropTypes.func.isRequired,
  saveProduct: PropTypes.func.isRequired,
  updateRequest: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

// selector function select data from the redux store
export function getProductById(products, id) {
  return products.items.find((product) => product._id === id) || null;
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params._id;
  const product = id ? getProductById(state.products, id) : newProduct;
  return {
    product,
    products: state.products,
    users: state.users,
    categories: state.categories,
  };
}

const mapDispatchToProps = {
  loadProducts: productAction.getProductsRequest,
  loadUsers: usersAction.getUsersRequest,
  loadCategories: categoriesAction.getCategoriesRequest,
  saveProduct: productAction.createProductRequest,
  updateRequest: productAction.updateProductsRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageProductPage);
