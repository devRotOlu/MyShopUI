import React, { useContext, useState, useEffect, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

import Brand from "../Brand.tsx";
import ModalTrigger from "../ModalTrigger.tsx";
import AccountDropDown from "./AccountDropDown.tsx";

import { appContext } from "../AppContext.tsx";
import "./style.css";

const Navbar = () => {
  const appStates = useContext(appContext);
  const { isLoggedIn, cartItemsCount } = appStates;

  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  const handleShowDropDown = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setShowDropDown((prevState) => !prevState);
  };

  useEffect(() => {
    const handleDropDown = () => {
      setShowDropDown(false);
    };
    window.addEventListener("click", handleDropDown);
    return () => window.removeEventListener("click", handleDropDown);
  }, []);

  return (
    <header className="d-flex justif y-content-between px-5" id="navbarWrapper">
      <div className="flex-grow-1 py-2">
        <Brand styles={{ width: "100px", height: "50px" }} />
      </div>
      <nav className="d-flex gap-5">
        {isLoggedIn && <AccountDropDown showDropDown={showDropDown} handleShowDropDown={handleShowDropDown} />}
        {!isLoggedIn && (
          <ModalTrigger modalInstance="login_shortCut">
            <button id="loginTriggerBtn" className="px-4" style={{ height: "fit-content", width: "fit-content" }}>
              Login/
              <br />
              Signup
            </button>
          </ModalTrigger>
        )}
        <div className="py-2">
          <Link to="/cart/overview" className="text-light d-flex align-items-center">
            <Icon icon="mi-shopping-cart" />
            <span className="ms-2 me-5">
              My <br />
              Cart
            </span>
            <span className="bg-light text-dark px-2 py-1">{cartItemsCount}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
