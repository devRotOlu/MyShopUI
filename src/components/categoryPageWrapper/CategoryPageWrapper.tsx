import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Category from "../category/Category";
import FilterPanel from "../flterPanel/FilterPanel";

import { productType, selectedPricesType } from "../../types";
import { getCategoryProducts } from "../../helperFunctions/dataFetchFunctions";
import { useFilterQueryParams } from "../../customHooks/useFilterQueryParams";

const CategoryPageWrapper = () => {
  const [selectedPrices, setSelectedPrices] = useState<selectedPricesType>({});
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const { productCategory } = useParams();

  const { min, max, rating } = useFilterQueryParams();

  const splittedStrings = productCategory.split("-");
  const id = Number(splittedStrings[splittedStrings.length - 1]);

  const { data, isLoading } = useQuery({
    queryKey: ["category_products", productCategory],
    queryFn: () => getCategoryProducts(id, min, max, rating),
    refetchOnWindowFocus: false,
  });

  const products: productType[] = data?.data || [];

  return (
    <Category products={products} key={productCategory} isLoading={isLoading}>
      <FilterPanel filterPanelData={{ setSelectedPrices, setSelectedRating, selectedPrices, selectedRating, products }} />
    </Category>
  );
};

export default CategoryPageWrapper;
