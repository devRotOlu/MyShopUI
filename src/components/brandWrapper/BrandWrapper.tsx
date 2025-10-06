import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdArrowBack, MdClose } from "react-icons/md";

import { appContext } from "../context/AppProvider";
import { cartContext } from "../context/CartProvider";
import logo from "../../assests/logo_new.webp";
import "./style.css";

const BrandWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";
  const { setModalIndex, modalIndex } = useContext(appContext);
  const { cartItemsCount } = useContext(cartContext);
  return (
    <div className="d-flex justify-content-between brand_wrapper">
      <div className="d-flex align-items-center gap-2">
        <div className="d-md-none">
          {!isHomePage && (
            <button aria-label="back" onClick={() => navigate(-1)}>
              <MdArrowBack size={22} />
            </button>
          )}
          {isHomePage && (
            <>
              {modalIndex === 0 && (
                <button aria-label="open-modal" onClick={() => setModalIndex(1)}>
                  <GiHamburgerMenu size={23} />
                </button>
              )}
              {modalIndex === 1 && (
                <button aria-label="close-modal" onClick={() => setModalIndex(0)}>
                  <MdClose size={22} />
                </button>
              )}
            </>
          )}
        </div>
        <Link to="/">
          <div className="brand">
            <img src={logo} alt="App Brand" style={{ width: "100%" }} />
          </div>
        </Link>
      </div>
      <Link className="d-md-none position-relative text-dark" to="/cart/overview">
        <AiOutlineShoppingCart size={22} />
        <span className="position-absolute top-0 d-flex align-items-center justify-content-center text-white item_count">{cartItemsCount}</span>
      </Link>
    </div>
  );
};

export default BrandWrapper;
