import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { Alert } from "reactstrap";

import * as productAction from "./productsActions";
import * as usersAction from "../userComponents/usersActions";
import * as categoriesAction from "../categoriesComponents/categoriesActions";
import ProductsList from "./ProductsList";

class Products extends Component {
  componentDidMount() {
    const { products, users, categories } = this.props;

    if (products.length === 0) {
      this.props.productActions.getProductsRequest();
    }
    if (users.length === 0) {
      this.props.usersActions.getUsersRequest();
    }
    if (categories.length === 0) {
      this.props.categoriesActions.getCategoriesRequest();
    }
  }

  handleDelete = (productId) => {
    console.log(productId);
    this.props.productActions.deleteProductRequest(productId);
  };

  handleCloseAlert = () => {
    this.props.productActions.productError({
      error: "",
    });
  };
  render() {
    const products = this.props.products;
    console.log(this.props);
    return (
      <>
        <h2>Products Page</h2>
        <Alert
          color="danger"
          isOpen={!!this.props.errorProducts.error}
          toggle={this.handleCloseAlert}
        >
          {this.props.errorProducts.error}
        </Alert>
        <ProductsList products={products} onDeleteProduct={this.handleDelete} />
      </>
    );
  }
}

Products.propTypes = {
  products: PropTypes.array.isRequired,
  productActions: PropTypes.object.isRequired,
  usersActions: PropTypes.object.isRequired,
  categoriesActions: PropTypes.object.isRequired,
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
    errorProducts: state.products,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    productActions: bindActionCreators(productAction, dispatch),
    usersActions: bindActionCreators(usersAction, dispatch),
    categoriesActions: bindActionCreators(categoriesAction, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
