import React, { useState, useCallback } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import MainNavigation from "../components/common/Navigation/MainNavigation";
// import PageNotFound from "./common/PageNoFound";
import AllProducts from "../components/productComponents/AllProducts";
import NewProduct from "./productComponents/NewProduct";
import UpdateProduct from "./productComponents/UpdateProduct";
import UserProducts from "./productComponents/UserProducts";
import Auth from "./userComponents/Auth";
import { AuthContext } from "./common/context/auth-context";
import Users from "./userComponents/Users";
import UserProfile from "./userComponents/UserProfile";
import UpdateUserProfile from "./userComponents/UpdateUserProfile";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/user/profile" component={UserProfile} />
        <Route exact path="/user/:userId" component={UpdateUserProfile} />
        <Route path="/products" component={AllProducts} />
        <Route exact path="/:userId/products" component={UserProducts} />
        <Route exact path="/product/new" component={NewProduct} />
        <Route path="/product/:productId" component={UpdateProduct} />
        <Route path="/about" component={AboutPage} />
        <Redirect to="/" />
        {/* <Route component={PageNotFound} /> */}
      </Switch>
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
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          userId: userId,
          login: login,
          logout: logout,
        }}
      >
        <MainNavigation />
        <main>{routes}</main>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
