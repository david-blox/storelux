import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";
import "./MainNavigation.css";
import cartImage from "../../../images/cartImage.png";

const MainNavigation = ({ isAuthenticated, userId }) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };
  return (
    <>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
        <div className="main-navigation__content">
          <h1 className="main-navigation__title">
            <Link to={`/${userId}/products`}>YourProducts</Link>
          </h1>
          <Link to={`/${userId}/shoppingCart`}>
            <div className="image-cart__content">
              <img src={cartImage} alt="cart" />
            </div>
          </Link>
        </div>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps)(MainNavigation);
