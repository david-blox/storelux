import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import MainNavigation from "../components/common/Navigation/MainNavigation";
import AllProducts from "../components/productComponents/AllProducts";
import NewProduct from "./productComponents/NewProduct";
import UpdateProduct from "./productComponents/UpdateProduct";
import UserProducts from "./productComponents/UserProducts";
import Auth from "./userComponents/Auth";
import Users from "./userComponents/Users";
import UserProfile from "./userComponents/UserProfile";
import UpdateUserProfile from "./userComponents/UpdateUserProfile";
import ShoppingCart from "./shoppingCartComponents/ShoppingCart";
import Logout from "./userComponents/Logout";
import * as actions from "./userComponents/usersActions/authActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = ({ isAuthenticated, userId, onTryAutoSignup }) => {
  let routes;
  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);
  
  // TODO: move switches components to LoggedIn and NotLoggedIn components
  if (isAuthenticated) {
    routes = (
      <>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/user/profile" component={UserProfile} />
          <Route exact path="/user/:userId" component={UpdateUserProfile} />
          <Route path="/products" component={AllProducts} />
          <Route path="/:userId/shoppingCart" component={ShoppingCart} />
          <Route exact path="/:userId/products" component={UserProducts} />
          <Route exact path="/product/new" component={NewProduct} />
          <Route path="/product/:productId" component={UpdateProduct} />
          <Route path="/about" component={AboutPage} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/" />
          {/* <Route component={PageNotFound} /> */}
        </Switch>
        <ToastContainer autoClose={3000} hideProgressBar />
      </>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/users" component={Users} />
        <Route path="/products" component={AllProducts} />
        <Route exact path="/:userId/products" component={UserProducts} />
        <Route path="/about" component={AboutPage} />
        <Route path="/auth" component={Auth} />
        {/* <Route component={PageNotFound} /> */}
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <div className="container-fluid">
      <MainNavigation />
      <main>{routes}</main>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
