import React from "react";
import { Link } from "react-router-dom";

import "./NavBar.css";
import logo from "./logo.png";

const NavBar = () => {
  return (
    <>
      <div className="navContainer">
        <img className="logoImage" src={logo} alt="Logo" />
        <Link className="logo" to="/">
          <h1 className="logoText">GitHub Users</h1>
          <p>-a simple GitHub User search</p>
        </Link>
      </div>
    </>
  );
};

export default NavBar;
