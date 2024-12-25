import React, { useContext } from "react";

import ProductCard from "../productCard/ProductCard.tsx";

import { appContext } from "../AppContext.tsx";
import "./style.css";

const ProductList = () => {
  const appStates = useContext(appContext);
  const { products } = appStates;

  if (!products.length) {
    return <div>Error!</div>;
  }

  const _products = products.map(({ name, description, unitPrice, quantity, images, id }) => {
    return (
      <div key={id} className="w-100">
        <ProductCard name={name} description={description} unitPrice={unitPrice} quantity={quantity} images={images} id={id} />
      </div>
    );
  });
  return <div id="product_list">{_products}</div>;
};

export default ProductList;
