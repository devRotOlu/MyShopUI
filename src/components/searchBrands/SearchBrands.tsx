import React from "react";
import { Link } from "react-router-dom";

import { searchBrandsProps } from "../../types";
import "./style.css";

const SearchBrands = ({ brands, children }: searchBrandsProps) => {
  const _categories = brands.map((brand, index) => {
    return (
      <li key={index} className="product_link_list w-50 mx-1 flex-grow-1">
        <Link to={`/brand/${brand}`} className="px-2 py-2 d-block">
          {brand}
        </Link>
      </li>
    );
  });

  return (
    <>
      {children}
      <ul className="p-0 m-0 d-flex" id="search_brands">
        {_categories}
      </ul>
    </>
  );
};

export default SearchBrands;
