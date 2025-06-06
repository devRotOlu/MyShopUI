import React, { useContext } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

import Brand from "../brand/Brand";

import { appContext } from "../context/AppProvider";
import { cartContext } from "../context/CartProvider";
import "./style.css";

const BrandWrapper = () => {
  const { setShowSidebar, showSidebar } = useContext(appContext);
  const { cartItemsCount } = useContext(cartContext);
  return (
    <div className="d-flex justify-content-between brand_wrapper">
      <div className="d-flex align-items-center gap-2">
        <div className="d-md-none">
          {!showSidebar ? (
            <button onClick={() => setShowSidebar(true)}>
              <Icon icon="formkit:open" fontSize={22} />
            </button>
          ) : (
            <button onClick={() => setShowSidebar(false)}>
              <Icon icon="formkit:close" fontSize={22} />
            </button>
          )}
        </div>
        <Link to="/">
          <div className="brand">
            <Brand />
          </div>
        </Link>
      </div>
      <div className="d-md-none position-relative">
        <Icon icon="mi-shopping-cart" fontSize={22} />
        <span className="position-absolute top-0 d-flex align-items-center justify-content-center text-white item_count">{cartItemsCount}</span>
      </div>
    </div>
  );
};

export default BrandWrapper;
