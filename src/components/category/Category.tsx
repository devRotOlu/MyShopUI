import React, { useState } from "react";

import PageWrapper from "../PageWrapper";
import ProductCardSkeleton from "../productCardSkeleton/ProductCardSkeleton";
import ProductCard from "../productCard/ProductCard";
import NavigationButtons from "../navigationButtons/NavigationButtons";
import BreadCrumb from "../breadCrumbs/BreadCrumb";

import { categoryProps, productType } from "../../types";
import "./style.css";

const maxProductPerPage = 20;
const Category = ({ products, isLoading, children }: categoryProps) => {
  const [currentProduct, setCurrentProducts] = useState<productType[]>([]);
  const _products = currentProduct.map((product) => {
    const { id } = product;
    return <ProductCard key={id} product={product} />;
  });

  const category = products?.length ? products[0].category.name : "";

  return (
    <PageWrapper pageId="product_category">
      <div className="align-self-stretch w-100">
        {isLoading && (
          <div className="d-flex justify-content-between" id="page_loader_wrapper">
            <ProductCardSkeleton count={4} />
          </div>
        )}
        {products.length && (
          <>
            <BreadCrumb currentLinkLabel={category} />
            <div className="px-4 d-flex gap-4">
              <div>{children}</div>
              <div className="flex-grow-1">
                <div className="d-flex gap-3">{_products}</div>
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

export default Category;
