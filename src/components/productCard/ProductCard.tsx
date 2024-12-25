import React, { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { reactLocalStorage } from "reactjs-localstorage";

import { ProductCardProp } from "../../types.ts";
import { myShopAxios } from "../../axios.ts";
import { appContext } from "../AppContext.tsx";
import "./style.css";

const ProductCard = ({ name, unitPrice, quantity, images, id }: ProductCardProp) => {
  const appStates = useContext(appContext);
  const { isLoggedIn, setCart, products } = appStates;

  const addToCart = (id: number) => {
    const product = products[id];
    if (!isLoggedIn) {
      const _products = reactLocalStorage.getObject("cart", undefined, true);
      if (!_products) {
        reactLocalStorage.setObject("cart", [product]);
      } else {
        reactLocalStorage.setObject("cart", [..._products, product]);
      }
      setCart((cartItems) => [...cartItems, product]);
    }
  };

  return (
    <div className="product_card w-100">
      <div className="w-100">
        <div className="product_image w-100">
          <img src={images[0].url} alt={name} style={{ width: "100%" }} />
        </div>
        <div className="product_title">
          <p>{name}</p>
        </div>
      </div>
      <div className="product_price border-bottom border-top">
        <p>{unitPrice}</p>
      </div>
      <div className="pt-2">
        <button onClick={() => addToCart(id)}>Add To Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
