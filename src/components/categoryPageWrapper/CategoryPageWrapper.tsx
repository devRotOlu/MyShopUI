import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Category from "../category/Category";
import FilterPanel from "../flterPanel/FilterPanel";

import { productType } from "../../types";
import { getCategoryProducts } from "../../helperFunctions/dataFetchFunctions";
import { useGetQueryParams } from "../../customHooks/useGetQueryParams";

const CategoryPageWrapper = () => {
  const { productCategory } = useParams();

  const { min, max, rating, sortOrder } = useGetQueryParams();

  const splittedStrings = productCategory.split("-");
  const id = Number(splittedStrings[splittedStrings.length - 1]);

  const { data, isLoading } = useQuery({
    queryKey: ["category_products", productCategory, `min-${min}`, `max-${max}`, `rating-${rating}`, `sortOrder-${sortOrder}`],
    queryFn: () => getCategoryProducts(id, min, max, rating, sortOrder),
    refetchOnWindowFocus: false,
  });

  const products: productType[] = data?.data || [];

  return (
    <Category products={products} key={productCategory} isLoading={isLoading}>
      <FilterPanel products={products} />
    </Category>
  );
};

export default CategoryPageWrapper;
