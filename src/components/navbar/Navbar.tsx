import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

import Brand from "../brand/Brand.tsx";
import AccountDropDown from "../accountDropdown/AccountDropDown.tsx";
import CategoryListModal from "./CategoryListModal.tsx";

import { userContext } from "../context/UserProvider.tsx";
import "./style.css";
import { cartContext } from "../context/CartProvider.tsx";

const Navbar = () => {
  const { isLoggedIn, setShowModal } = useContext(userContext);
  const { cartItemsCount } = useContext(cartContext);

  return (
    <header className="position-fixed w-100 top-0" id="navbarWrapper">
      <div className="w-100 position-relative">
        <div className="d-flex justify-content-between px-5 w-100 position-relative">
          <div className="flex-grow-1 py-2">
            <Brand styles={{ width: "100px", height: "50px" }} />
          </div>
          <nav className="d-flex gap-5">
            {isLoggedIn && <AccountDropDown />}
            {!isLoggedIn && (
              <button className="loginTriggerBtn" onClick={() => setShowModal(true)}>
                Login/
                <br />
                Signup
              </button>
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
        </div>
        <div className="position-relative py-4">
          <div className="position-absolute w-100 left-0 right-0 h-100 pb-3 px-5" id="category_list_wrapper">
            <div className="h-100 position-relative" id="category_list_toggle">
              <div className="d-flex align-items-center h-100">
                <button className="h-100 d-flex align-items-center justify-content-center px-4 gap-1">
                  Categories <Icon icon="solar:hamburger-menu-outline" color="white" fontSize={15} />
                </button>
              </div>
              <CategoryListModal />
            </div>
            <div id="category_list_modal"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
