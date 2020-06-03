import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../context/auth-context";
import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          HOME
        </NavLink>
      </li>
      <li>
        <NavLink to="/users" exact>
          ALL USERS
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/products`}>MY PRODUCTS</NavLink>
        </li>
      )}
      <li>
        <NavLink to="/products">ALL PRODUCTS</NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/product/new">ADD PRODUCT</NavLink>
        </li>
      )}
      <li>
        <NavLink to="/about">ABOUT US</NavLink>
      </li>
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">LOGIN</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
