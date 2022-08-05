import {debounce} from "lodash";
import React, {useEffect, useLayoutEffect, useState} from "react";
import {FaBars} from "react-icons/fa";
import "./Header.scss";
import NavBar from "./NavBar";
const Header = () => {
  const [openNavSideBar, setOpenNavSideBar] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [mediaQuery, setMediaQuery] = useState(
    window.innerWidth > 800 ? "desktop" : "mobile"
  );

  useLayoutEffect(() => {
    function updateWidth() {
      setWindowWidth(window.innerWidth);
    }

    const debouncedUpdateSize = debounce(updateWidth, 100);

    window.addEventListener("resize", debouncedUpdateSize);
    updateWidth();
    return () => window.removeEventListener("resize", debouncedUpdateSize);
  }, []);

  useEffect(() => {
    if (windowWidth < 800 && mediaQuery === "desktop") {
      setMediaQuery("mobile");
    } else if (windowWidth > 800 && mediaQuery === "mobile") {
      setMediaQuery("desktop");
      setOpenNavSideBar(false);
    }
  }, [windowWidth]);

  return (
    <div id="header">
      <NavBar openNavSideBar={openNavSideBar} />
      <button
        id="hamburger_container"
        className="border-gradient border-gradient-purple"
        onClick={() => setOpenNavSideBar(!openNavSideBar)}
      >
        <FaBars color="white" />
      </button>
    </div>
  );
};

export default Header;
