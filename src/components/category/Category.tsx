import React, { useContext, useState } from "react";

import PageWrapper from "../PageWrapper";
import ProductCardSkeleton from "../productCardSkeleton/ProductCardSkeleton";
import ProductCard from "../productCard/ProductCard";
import NavigationButtons from "../navigationButtons/NavigationButtons";
import BreadCrumb from "../breadCrumb/BreadCrumb";
import CategoryPageLayout from "../categoryPageLayout/CategoryPageLayout";
import SortPanel from "../sortPanel/SortPanel";
import HomeCardWrapper from "../homeCardsWrapper/HomeCardsWrapper";
import CategoryCardsWrapper from "../categoryCardsWrapper/CategoryCardsWrapper";

import { categoryProps, productType } from "../../types";
import "./style.css";
import { appContext } from "../context/AppProvider";

const maxProductPerPage = 20;
const firstPage = 1;
const Category = ({ products, isLoading, children }: categoryProps) => {
  const [currentPage, setCurrentPage] = useState(firstPage);
  const [currentProduct, setCurrentProducts] = useState<productType[]>([]);
  const { handleFilter } = useContext(appContext);
  const _products = currentProduct.map((product) => {
    const { id } = product;
    return <ProductCard key={id} product={product} />;
  });

  const handleFilterModal = () => {
    handleFilter(2, children);
  };

  const category = products?.length ? products[0].category.name : "";

  return (
    <PageWrapper pageId="product_category">
      <div className="align-self-stretch w-100">
        {isLoading && (
          <HomeCardWrapper>
            <ProductCardSkeleton count={5} />
          </HomeCardWrapper>
        )}
        {products.length > 0 && (
          <>
            <BreadCrumb handleFilterModal={handleFilterModal} currentLinkLabel={category}>
              <SortPanel currentPage={currentPage} productPerPage={maxProductPerPage} totalProducts={products.length} />
            </BreadCrumb>
            <CategoryPageLayout filterWrapper={<div>{children}</div>}>
              <CategoryCardsWrapper>{_products}</CategoryCardsWrapper>
              {products.length > 0 && (
                <div className="align-self-end d-flex justify-content-center w-100 mt-5">
                  <NavigationButtons params={{ itemCount: products.length, maxItemPerPage: maxProductPerPage, setCurrentItems: setCurrentProducts, items: products, currentPage, setCurrentPage, firstPage, currentItems: currentProduct }} />
                </div>
              )}
            </CategoryPageLayout>
          </>
        )}
      </div>
    </PageWrapper>
  );
};

export default Category;
