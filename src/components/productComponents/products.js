import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as productAction from "./productsActions";
import * as usersAction from "../userComponents/usersActions";
import * as categoriesAction from "../categoriesComponents/categoriesActions";
import ProductsList from "./ProductsList";
import { Redirect } from "react-router-dom";

class Products extends Component {
  state = {
    redirectToAddProductPage: false,
  };

  componentDidMount() {
    const { products, users, categories } = this.props;

    if (products.length === 0) {
      this.props.loadProducts.getProductsRequest();
    }
    if (users.length === 0) {
      this.props.loadUsers.getUsersRequest();
    }
    if (categories.length === 0) {
      this.props.loadCategories.getCategoriesRequest();
    }
  }

  render() {
    const products = this.props.products;
    const users = this.props.users;
    const categories = this.props.categories;
    return (
      <>
        {this.state.redirectToAddProductPage && <Redirect to="/product" />}
        <h2>Products Page</h2>
        <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary add-product"
          onClick={() => this.setState({ redirectToAddProductPage: true })}
        >
          Add Product
        </button>
        <ProductsList
          products={products}
          users={users}
          categories={categories}
        />
      </>
    );
  }
}

Products.propTypes = {
  products: PropTypes.array.isRequired,
  loadProducts: PropTypes.object.isRequired,
  loadUsers: PropTypes.object.isRequired,
  loadCategories: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    products:
      state.users.items.length === 0
        ? []
        : state.products.items.map((product) => {
            return {
              ...product,
              userName: state.users.items.map((user) =>
                user.id === product.userId
                  ? user.firstName + " " + user.lastName
                  : null
              ),
            };
          }),
    users: state.users.items,
    categories: state.categories.items,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadProducts: bindActionCreators(productAction, dispatch),
    loadUsers: bindActionCreators(usersAction, dispatch),
    loadCategories: bindActionCreators(categoriesAction, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
