import React, { useContext, useState } from "react";

import PageWrapper from "../PageWrapper.tsx";
import NavigationButtons from "../navigationButtons/NavigationButtons.tsx";
import HomeProductLayout from "../homeProductLayout/HomeProductLayout.tsx";
import ProductCard from "../productCard/ProductCard.tsx";
import ProductCardSkeleton from "../productCardSkeleton/ProductCardSkeleton.tsx";

import "./style.css";
import { userContext } from "../context/UserProvider.tsx";
import { productType } from "../../types.ts";

const maxProductPerPage = 10;
const firstPage = 1;
const Home = () => {
  const { products, isLoadingProducts, productsFetched } = useContext(userContext);
  const [currentPage, setCurrentPage] = useState(firstPage);
  const [currentProducts, setCurrentProducts] = useState<productType[]>([]);

  const productCards = currentProducts.map((product) => {
    const { id } = product;
    return <ProductCard key={id} product={product} />;
  });

  return (
    <PageWrapper pageId="home">
      {isLoadingProducts && (
        <div className="w-100 d-flex justify-content-between px-4 flex-wrap gap-3 mb-5">
          <ProductCardSkeleton count={4} />
        </div>
      )}
      {productsFetched && (
        <HomeProductLayout productCards={productCards}>
          <div className="d-flex justify-content-center w-100 mt-5">
            <NavigationButtons params={{ itemCount: products.length, maxItemPerPage: maxProductPerPage, setCurrentItems: setCurrentProducts, items: products, currentPage, setCurrentPage, firstPage }} />
          </div>
        </HomeProductLayout>
      )}
    </PageWrapper>
  );
};

export default Home;
