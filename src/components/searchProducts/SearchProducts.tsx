import React from "react";
import { Link } from "react-router-dom";

import ProductImage from "../../ProductImage";

import { searchProductsProps } from "../../types/types";
import "./style.css";

const SearchProducts = ({ products, children }: searchProductsProps) => {
  const _products = products.map(({ id, name, images }) => {
    const image = images[0].url;
    const productName = `${name}-` + id;
    return (
      <li key={id} className="product_link_list">
        <Link to={`/product/${productName}`} className="px-2 py-1 d-flex gap-2 align-items-center">
          <div>
            <ProductImage url={image} name={name} imageSizes="100px" />
          </div>
          <p>{name}</p>
        </Link>
      </li>
    );
  });

  return (
    <>
      {children}
      <ul className="px-1 py-0 m-0" id="search_products">
        {_products}
      </ul>
    </>
  );
};

export default SearchProducts;
