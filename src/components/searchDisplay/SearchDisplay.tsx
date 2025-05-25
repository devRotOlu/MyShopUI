import React from "react";

import SearchProducts from "../searchProducts/SearchProducts";
import SearchBrands from "../searchBrands/SearchBrands";
import SearchCategories from "../searchCategories/SearchCategories";

import "./style.css";
import { searchDisplayProps } from "../../types";

const SearchDisplay = ({ searchResults, searchTerm }: searchDisplayProps) => {
  const { products, categories, brands } = searchResults!;
  const isEmptySearch = !products.length && !categories.length && !brands.length;
  return (
    <div id="search_display" className="bg-white pb-1">
      {isEmptySearch && (
        <div>
          <p className="px-2 py-1 fw-bold">
            NO RESULT FOUND <br />
            FOR <span className="fst-italic">{searchTerm.toUpperCase()}</span>
          </p>
        </div>
      )}

      {!isEmptySearch && (
        <div className="d-flex flex-column gap-1">
          {categories.length !== 0 && (
            <SearchCategories categories={categories}>
              <p className="px-2 py-1 display_title fw-bold">SUGGESTIONS</p>
            </SearchCategories>
          )}
          {products.length !== 0 && (
            <SearchProducts products={products}>
              <p className="px-2 py-1 display_title fw-bold">PRODUCTS</p>
            </SearchProducts>
          )}
          {brands.length !== 0 && (
            <SearchBrands brands={brands}>
              <p className="px-2 py-1 display_title fw-bold">MATCHING BRANDS</p>
            </SearchBrands>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchDisplay;
