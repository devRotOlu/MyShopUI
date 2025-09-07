import React from "react";

import SearchProducts from "../searchProducts/SearchProducts";
import SearchBrands from "../searchBrands/SearchBrands";

import "./style.css";
import { searchDisplayProps } from "../../types/types";

const SearchDisplay = ({ searchResults, searchTerm }: searchDisplayProps) => {
  const { products, brands } = searchResults!;
  const isEmptySearch = !products.length && !brands.length;

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
          {products.length > 0 && (
            <SearchProducts products={products}>
              <p className="px-2 py-1 display_title fw-bold">PRODUCTS</p>
            </SearchProducts>
          )}
          {brands.length > 0 && (
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
