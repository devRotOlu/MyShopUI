import React from "react";
import { Link } from "react-router-dom";

import "./style.css";
import { searchDisplayProps } from "../../types";

const SearchDisplay = ({ searchResults, searchTerm }: searchDisplayProps) => {
  const _searchResults = searchResults!.map(({ id, name, images }) => {
    const image = images[0].url;
    const productName = `${name}-` + id;
    return (
      <li key={id} className="product_link_list">
        <Link to={`/product/${productName}`} className="px-2 py-1 d-flex gap-2 align-items-center">
          <img src={image} alt={name} />
          <p>{name}</p>
        </Link>
      </li>
    );
  });
  return (
    <div id="search_display" className="bg-white pb-1">
      {!searchResults!.length && (
        <div>
          <p className="px-2 py-1 fw-bold">
            NO RESULT FOUND <br />
            FOR <span className="fst-italic">{searchTerm.toUpperCase()}</span>
          </p>
        </div>
      )}
      {searchResults?.length !== 0 && (
        <div>
          <p className="px-2 py-1" id="display_title">
            PRODUCTS
          </p>
          <ul className="px-1 py-0 m-0">{_searchResults}</ul>
        </div>
      )}
    </div>
  );
};

export default SearchDisplay;
