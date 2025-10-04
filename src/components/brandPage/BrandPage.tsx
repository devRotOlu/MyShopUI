import React, { useContext, useState } from "react";

import PageWrapper from "../PageWrapper";
import ProductCardSkeleton from "../productCardSkeleton/ProductCardSkeleton";
import ProductCard from "../productCard/ProductCard";
import BreadCrumb from "../breadCrumb/BreadCrumb";
import NavigationButtons from "../navigationButtons/NavigationButtons";
import CategoryPageLayout from "../categoryPageLayout/CategoryPageLayout";
import CategoryCardsWrapper from "../categoryCardsWrapper/CategoryCardsWrapper";
import SortPanel from "../sortPanel/SortPanel";
import HomeProductCardWrapper from "../homeCardsWrapper/HomeCardsWrapper";
import SEOEnhanzer from "../../SEOEnhanzer";
import EmptyView from "../emptyView/EmptyView";

import { brandPageProps, productType } from "../../types/types";
import { appContext } from "../context/AppProvider";
import { genBrandDescription } from "../../helperFunctions/utilityFunctions";

const maxProductPerPage = 20;
const firstPage = 1;
const BrandPage = ({ ...props }: brandPageProps) => {
  const { brand, products, isLoading, children, isFetched, isSuccess } = props;
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

  const isEmptyView = (isFetched && isLoading === false && isSuccess === false) || (isSuccess && products.length === 0);
  const isLoadingProducts = isLoading || isFetched === false;

  return (
    <>
      <SEOEnhanzer title={`${brand} | MyShop Online Shopping`} description={genBrandDescription(brand)} />
      <PageWrapper pageId="brands">
        <div className="align-self-stretch w-100">
          {isLoadingProducts && (
            <div id="home_wrapper_container">
              <HomeProductCardWrapper>
                <ProductCardSkeleton count={4} />
              </HomeProductCardWrapper>
            </div>
          )}
          {isSuccess && (
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
        {isEmptyView && <EmptyView icon="mdi:package-variant-remove" label="No products available" message="Please check back later or explore other categories." />}
      </PageWrapper>
    </>
  );
};

export default BrandPage;
