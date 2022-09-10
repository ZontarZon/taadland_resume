import React from "react";
import {FaHouseUser, FaList, FaQuestion} from "react-icons/fa";

const NavBar = ({openNavSideBar}) => {
  return (
    <div id="links_container" style={{left: openNavSideBar ? "0px" : "-200px"}}>
      <a href="/" className="nav_btn border-gradient border-gradient-purple">
        <FaHouseUser />
        <p>Home</p>
      </a>
      <a
        href="/about"
        className="nav_btn border-gradient border-gradient-purple"
      >
        <FaQuestion />
        <p>About Me</p>
      </a>
      <a
        href="/resume"
        className="nav_btn border-gradient border-gradient-purple"
      >
        <FaList />
        <p>Resume</p>
      </a>
      {/*<a
        href="/gallery"
        className="nav_btn border-gradient border-gradient-purple"
      >
        <FaPalette />
        <p>Art Gallery</p>
  </a>*/}
    </div>
  );
};

export default NavBar;
