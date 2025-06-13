import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

import AccountDropDown from "../accountDropdown/AccountDropDown.tsx";
import CategoryList from "../categoryList/CategoryList.tsx";
import SearchbarBrandWrapper from "../searchbarBrandWrapper/SearchbarBrandWrapper.tsx";

import { userContext } from "../context/UserProvider.tsx";
import "./style.css";
import { cartContext } from "../context/CartProvider.tsx";

const Navbar = () => {
  const { isLoggedIn, setShowModal } = useContext(userContext);
  const { cartItemsCount } = useContext(cartContext);
  const headerRef = useRef<HTMLHeadElement>(null!);

  useEffect(() => {
    const updateNavbarHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        // Set CSS variable on the root element
        document.documentElement.style.setProperty("--navbar-height", `${height}px`);
      }
    };
    updateNavbarHeight();
    window.addEventListener("resize", updateNavbarHeight);
    return () => window.removeEventListener("resize", updateNavbarHeight);
  }, []);

  return (
    <header className="position-fixed vw-100 top-0" id="navbarWrapper" ref={headerRef}>
      <div className="w-100 position-relative">
        <div className="d-flex justify-content-between px-xxl-5 px-md-5 px-0 w-100 position-relative">
          <SearchbarBrandWrapper />
          <nav className="d-md-flex gap-xxl-5 gap-sm-2 d-none">
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
        <div className="d-md-block d-none">
          <CategoryList />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
