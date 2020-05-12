import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = (props) => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          HOME
        </NavLink>
      </li>
      <li>
        <NavLink to="/u1/products">MY PRODUCTS</NavLink>
      </li>
      <li>
        <NavLink to="/products">ALL PRODUCTS</NavLink>
      </li>
      <li>
        <NavLink to="/product/new">ADD PRODUCT</NavLink>
      </li>
      <li>
        <NavLink to="/about">ABOUT US</NavLink>
      </li>
      <li>
        <NavLink to="/auth">AUTHENTICATE</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
