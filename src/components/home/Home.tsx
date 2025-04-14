import React from "react";

import ProductList from "../productList/ProductList.tsx";
import PageWrapper from "../PageWrapper.tsx";

import "./style.css";

const Home = () => {
  return (
    <PageWrapper pageId="home">
      <ProductList />
    </PageWrapper>
  );
};

export default Home;
