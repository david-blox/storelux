import React from "react";
import { Route, Switch } from "react-router-dom";

import Products from "./productComponents/products";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import MainNavigation from "../components/common/Navigation/MainNavigation";
import ManageProductPage from "./productComponents/ManageProductPage";
import PageNotFound from "./common/PageNoFound";
import Registration from "./auth/Registration";

function App() {
  return (
    <div className="container-fluid">
      <MainNavigation />
      <main>
        <Switch>
          <Route exact path="/" component={Registration} />
          <Route exact path="/home" component={HomePage} />
          <Route path="/products" component={Products} />
          <Route exact path="/product/:_id" component={ManageProductPage} />
          <Route path="/product/new" component={ManageProductPage} />
          <Route path="/about" component={AboutPage} />
          <Route component={PageNotFound} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
