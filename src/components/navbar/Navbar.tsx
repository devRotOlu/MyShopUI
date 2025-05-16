import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

import Brand from "../brand/Brand.tsx";
import AccountDropDown from "../accountDropdown/AccountDropDown.tsx";
import CategoryList from "../categoryList/CategoryList.tsx";

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
          <div className="flex-grow-1 py-2 d-flex align-items-center">
            <Link to="/">
              <Brand styles={{ width: "120px" }} />
            </Link>
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
        <CategoryList />
      </div>
    </header>
  );
};

export default Navbar;
