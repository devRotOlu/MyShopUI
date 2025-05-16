import React, { useContext, useState } from "react";

import PageWrapper from "../PageWrapper.tsx";
import NavigationButtons from "../navigationButtons/NavigationButtons.tsx";
import ProductCard from "../productCard/ProductCard.tsx";
import ProductCardSkeleton from "../productCardSkeleton/ProductCardSkeleton.tsx";

import "./style.css";
import { userContext } from "../context/UserProvider.tsx";
import { productType } from "../../types.ts";

const maxProductPerPage = 20;

const Home = () => {
  const { products } = useContext(userContext);
  const [currentProducts, setCurrentProducts] = useState<productType[]>([]);

  const productCards = currentProducts.map((product) => {
    const { id } = product;
    return <ProductCard key={id} product={product} />;
  });

  return (
    <PageWrapper pageId="home">
      <div className="d-flex flex-wrap align-self-stretch w-100">
        <div className="w-100">
          <div className="w-100 d-flex justify-content-between px-4">
            {!products.length && <ProductCardSkeleton count={4} />}
            {products.length !== 0 && productCards}
          </div>
        </div>
        {products.length !== 0 && (
          <div className="align-self-end d-flex justify-content-center w-100 my-4">
            <NavigationButtons itemCount={products.length} maxItemPerPage={maxProductPerPage} items={products} setCurrentItems={setCurrentProducts} />
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Home;
