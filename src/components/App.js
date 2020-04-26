import React from "react";
import { Route, Switch } from "react-router-dom";
import Products from "./productComponents/products";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import Header from "./common/Header";
import ManageProductPage from "./productComponents/ManageProductPage";
import PageNotFound from "./common/PageNoFound";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/products" component={Products} />
        <Route path="/product/:_id" component={ManageProductPage} />
        <Route path="/product" component={ManageProductPage} />
        <Route path="/about" component={AboutPage} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
