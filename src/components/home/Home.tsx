import React, { useContext, useState } from "react";

import PageWrapper from "../PageWrapper.tsx";
import NavigationButtons from "../navigationButtons/NavigationButtons.tsx";
import PageLayout from "../pageLayout/PageLayout.tsx";
import ProductCard from "../productCard/ProductCard.tsx";

import "./style.css";
import { userContext } from "../context/UserProvider.tsx";
import { productType } from "../../types.ts";

const maxProductPerPage = 10;

const Home = () => {
  const { products, isLoadingProducts } = useContext(userContext);
  const [currentProducts, setCurrentProducts] = useState<productType[]>([]);

  const productCards = currentProducts.map((product) => {
    const { id } = product;
    return (
      <div key={id} className="product_card_container">
        <ProductCard product={product} />
      </div>
    );
  });

  return (
    <PageWrapper pageId="home">
      <PageLayout productCards={productCards} isLoading={isLoadingProducts}>
        {products.length !== 0 && (
          <div className="align-self-end d-flex justify-content-center w-100 my-4">
            <NavigationButtons itemCount={products.length} maxItemPerPage={maxProductPerPage} items={products} setCurrentItems={setCurrentProducts} />
          </div>
        )}
      </PageLayout>
    </PageWrapper>
  );
};

export default Home;
