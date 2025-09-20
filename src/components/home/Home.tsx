import React, { useContext, useState } from "react";

import PageWrapper from "../PageWrapper.tsx";
import NavigationButtons from "../navigationButtons/NavigationButtons.tsx";
import HomeProductLayout from "../homeProductLayout/HomeProductLayout.tsx";
import ProductCard from "../productCard/ProductCard.tsx";
import HomeCardsWrapper from "../homeCardsWrapper/HomeCardsWrapper.tsx";
import ProductCardSkeleton from "../productCardSkeleton/ProductCardSkeleton.tsx";
import SEOEnhanzer from "../../SEOEnhanzer.tsx";

import "./style.css";
import { productType } from "../../types/types.ts";
import { productContext } from "../context/ProductProvider.tsx";

const maxProductPerPage = 10;
const firstPage = 1;
const Home = () => {
  const { products, isLoadingProducts, productsFetched } = useContext(productContext);
  const [currentPage, setCurrentPage] = useState(firstPage);
  const [currentProducts, setCurrentProducts] = useState<productType[]>([]);

  const productCards = currentProducts.map((product) => {
    const { id } = product;
    return <ProductCard key={id} product={product} />;
  });

  return (
    <PageWrapper pageId="home">
      <SEOEnhanzer
        title="Buy Phones, Fashion, Electronics in MyShop"
        description="Shop Online for Electronics, Phones, Computers, Accessories, Fashion, Shoes, Household Equipments, Wines, Babies, Toys, Furnitures, Groceries, Sport and Fitness, Books and more in Nigeria from top brands with 100% satisfaction and fast shipping. MyShop Online Shopping."
        imageUrl=""
        url=""
      />
      {isLoadingProducts && (
        <HomeCardsWrapper>
          <ProductCardSkeleton count={5} />
        </HomeCardsWrapper>
      )}
      {productsFetched && (
        <HomeProductLayout>
          <HomeCardsWrapper>{productCards}</HomeCardsWrapper>
          <div className="d-flex justify-content-center w-100 mt-5">
            <NavigationButtons params={{ itemCount: products.length, maxItemPerPage: maxProductPerPage, setCurrentItems: setCurrentProducts, items: products, currentPage, setCurrentPage, firstPage, currentItems: currentProducts }} />
          </div>
        </HomeProductLayout>
      )}
    </PageWrapper>
  );
};

export default Home;
