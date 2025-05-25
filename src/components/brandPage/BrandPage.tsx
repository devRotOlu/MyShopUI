import React, { useState } from "react";

import PageWrapper from "../PageWrapper";
import ProductCardSkeleton from "../productCardSkeleton/ProductCardSkeleton";
import ProductCard from "../productCard/ProductCard";
import BreadCrumb from "../breadCrumbs/BreadCrumb";
import NavigationButtons from "../navigationButtons/NavigationButtons";

import { brandPageProps, productType } from "../../types";

const maxProductPerPage = 20;
const BrandPage = ({ ...props }: brandPageProps) => {
  const { brand, products, isLoading, children } = props;
  const [currentProduct, setCurrentProducts] = useState<productType[]>([]);

  const _products = currentProduct.map((product) => {
    const { id } = product;
    return <ProductCard key={id} product={product} />;
  });

  return (
    <PageWrapper pageId="brands">
      <div className="align-self-stretch w-100">
        {isLoading && (
          <div className="d-flex justify-content-between" id="page_loader_wrapper">
            <ProductCardSkeleton count={4} />
          </div>
        )}
        {products?.length && (
          <>
            <BreadCrumb currentLinkLabel={brand} />
            <div className="px-4 d-flex gap-4">
              <div className="">{children}</div>
              <div className="flex-grow-1">
                <div className="d-flex gap-3 w-100">{_products}</div>
                {products.length && (
                  <div className="align-self-end d-flex justify-content-center w-100 my-4">
                    <NavigationButtons itemCount={products.length} maxItemPerPage={maxProductPerPage} setCurrentItems={setCurrentProducts} items={products} />
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </PageWrapper>
  );
};

export default BrandPage;
