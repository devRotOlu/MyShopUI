import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import PageWrapper from "../PageWrapper";
import ProductCardSkeleton from "../productCardSkeleton/ProductCardSkeleton";
import ProductCard from "../productCard/ProductCard";
import NavigationButtons from "../navigationButtons/NavigationButtons";
import BreadCrumb from "../breadCrumbs/BreadCrumb";

import { categoryProps, productType } from "../../types";
import { getCategoryProducts } from "../../helperFunctions/dataFetchFunctions";
import "./style.css";

const maxProductPerPage = 20;
const Category = ({ productCategory }: categoryProps) => {
  const [products, setProducts] = useState<productType[]>([]);
  const [currentProduct, setCurrentProducts] = useState<productType[]>([]);
  const categoryRef = useRef("");

  const splittedStrings = productCategory.split("-");
  const id = Number(splittedStrings[splittedStrings.length - 1]);
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["category_products", productCategory],
    queryFn: () => getCategoryProducts(id),
    refetchOnWindowFocus: false,
  });
  const _products = currentProduct.map((product) => {
    const { id } = product;
    return <ProductCard key={id} product={product} />;
  });
  useEffect(() => {
    if (isSuccess) {
      const { products, category } = data?.data;
      categoryRef.current = category?.name;
      setProducts(products);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

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
            <BreadCrumb currentLinkLabel={categoryRef.current} />
            <div className="px-4">
              <div className="d-flex gap-3">{_products}</div>
              {products.length && (
                <div className="align-self-end d-flex justify-content-center w-100 my-4">
                  <NavigationButtons itemCount={products.length} maxItemPerPage={maxProductPerPage} setCurrentItems={setCurrentProducts} items={products} />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </PageWrapper>
  );
};

export default Category;
