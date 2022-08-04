import React from "react";
import {FaBars} from "react-icons/fa";
import "./Header.scss";
import NavBar from "./NavBar";

const Header = () => {
  return (
    <div id="header">
      <NavBar/>
      <button
        id="hamburger_container"
        className="border-gradient border-gradient-purple"
      >
        <FaBars color="white" />
      </button>
    </div>
  );
};

export default Header;
