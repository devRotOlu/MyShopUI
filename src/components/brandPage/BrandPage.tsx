import React, { useContext, useState } from "react";

import PageWrapper from "../PageWrapper";
import ProductCardSkeleton from "../productCardSkeleton/ProductCardSkeleton";
import ProductCard from "../productCard/ProductCard";
import BreadCrumb from "../breadCrumb/BreadCrumb";
import NavigationButtons from "../navigationButtons/NavigationButtons";
import CategoryPageLayout from "../categoryPageLayout/CategoryPageLayout";
import CategoryCardsWrapper from "../categoryCardsWrapper/CategoryCardsWrapper";
import SortPanel from "../sortPanel/SortPanel";

import { brandPageProps, productType } from "../../types/types";
import { appContext } from "../context/AppProvider";
import HomeProductCardWrapper from "../homeCardsWrapper/HomeCardsWrapper";

const maxProductPerPage = 20;
const firstPage = 1;
const BrandPage = ({ ...props }: brandPageProps) => {
  const { brand, products, isLoading, children } = props;
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

  return (
    <PageWrapper pageId="brands">
      <div className="align-self-stretch w-100">
        {isLoading && (
          <div id="home_wrapper_container">
            <HomeProductCardWrapper>
              <ProductCardSkeleton count={4} />
            </HomeProductCardWrapper>
          </div>
        )}
        {products?.length && (
          <>
            <BreadCrumb handleFilterModal={handleFilterModal} currentLinkLabel={brand}>
              <SortPanel currentPage={currentPage} productPerPage={maxProductPerPage} totalProducts={products.length} />
            </BreadCrumb>
            <CategoryPageLayout filterWrapper={<div>{children}</div>}>
              <CategoryCardsWrapper>{_products}</CategoryCardsWrapper>
              {products.length > 0 && (
                <div className="align-self-end d-flex justify-content-center w-100 my-4">
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

export default BrandPage;
