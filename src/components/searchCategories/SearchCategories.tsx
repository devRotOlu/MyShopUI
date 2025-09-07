import React from "react";
import { Link } from "react-router-dom";

import { searchCategoriesProps } from "../../types/types";

const SearchCategories = ({ categories, children }: searchCategoriesProps) => {
  const _categories = categories.map(({ id, name }) => {
    const categoryName = `${name}-` + id;
    return (
      <li key={id} className="product_link_list">
        <Link to={`/product/${categoryName}`} className="px-2 py-1">
          {name}
        </Link>
      </li>
    );
  });

  return (
    <>
      {children}
      <ul className="px-1 py-0 m-0" id="search_categories">
        {_categories}
      </ul>
    </>
  );
};

export default SearchCategories;
