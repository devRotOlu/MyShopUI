import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

import Brand from "../Brand.tsx";
import ModalTrigger from "../ModalTrigger.tsx";

import { appContext } from "../AppContext.tsx";
import "./style.css";

const Navbar = () => {
  const appStates = useContext(appContext);
  const { isLoggedIn, cartItemsCount } = appStates;

  return (
    <header className="d-flex justif y-content-between px-5" id="navbarWrapper">
      <div className="flex-grow-1 py-2">
        <Brand styles={{ width: "100px", height: "50px" }} />
      </div>
      <nav className="d-flex gap-5">
        <ModalTrigger modalInstance="login_shortCut">
          <button id="loginTriggerBtn" class_name="px-5">
            Login/
            <br />
            Signup
          </button>
        </ModalTrigger>
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
