import React from "react";
import { Link } from "react-router-dom";

import "./NavBar.css";
import logo from "./logo.png";

const NavBar = () => {
  return (
    <>
      <div className="navContainer">
        <Link className="logo" to="/">
          <h1>
            <img className="logoImage" src={logo} alt="Logo" />
            GitHub User List
          </h1>
        </Link>
      </div>
    </>
  );
};

export default NavBar;
