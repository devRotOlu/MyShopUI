import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useDebounce } from "use-debounce";

import Brand from "../brand/Brand.tsx";
import AccountDropDown from "../accountDropdown/AccountDropDown.tsx";
import CategoryList from "../categoryList/CategoryList.tsx";
import SearchBar from "../searchBar/SearchBar.tsx";
import SearchDisplay from "../searchDisplay/SearchDisplay.tsx";

import { userContext } from "../context/UserProvider.tsx";
import "./style.css";
import { cartContext } from "../context/CartProvider.tsx";
import { searchResultType } from "../../types.ts";

const Navbar = () => {
  const [searchResults, setSearchResults] = useState<searchResultType | null>(null);
  const [userInput, setUserInput] = useState("");
  const [searchTerm] = useDebounce(userInput, 700);
  const { isLoggedIn, setShowModal } = useContext(userContext);
  const { cartItemsCount } = useContext(cartContext);

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults(null);
    }
  }, [searchTerm]);

  return (
    <header className="position-fixed w-100 top-0" id="navbarWrapper">
      <div className="w-100 position-relative">
        <div className="d-flex justify-content-between px-5 w-100 position-relative">
          <div className="flex-grow-1 py-2 d-flex align-items-center justify-content-between pe-2">
            <Link to="/">
              <Brand styles={{ width: "120px" }} />
            </Link>
            <div id="search_bar_wrapper" className="position-relative">
              <SearchBar setSearchResults={setSearchResults} userInput={userInput} setUserInput={setUserInput} searchTerm={searchTerm} />
              {searchResults && (
                <div className="w-100">
                  <SearchDisplay searchResults={searchResults} searchTerm={searchTerm} />
                </div>
              )}
            </div>
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
