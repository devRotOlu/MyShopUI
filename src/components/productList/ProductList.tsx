import React, { useContext } from "react";

import ProductCard from "../productCard/ProductCard.tsx";
import ProductCardSkeleton from "../productCard/ProductCardSkeleton.tsx";

import { userContext } from "../context/UserProvider.tsx";

const ProductList = () => {
  const { products } = useContext(userContext);

  const _products = products.map((product) => {
    const { id } = product;
    return <ProductCard key={id} product={product} />;
  });

  return (
    <>
      <div id="product_list" className="w-100 d-flex justify-content-between px-4 py-5">
        {!products.length && <ProductCardSkeleton count={4} />}
        {products.length && _products}
      </div>
    </>
  );
};

export default ProductList;
