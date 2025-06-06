import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import SearchBar from "../searchBar/SearchBar";
import SearchDisplay from "../searchDisplay/SearchDisplay";
import BrandWrapper from "../brandWrapper/BrandWrapper";

import { searchResultType } from "../../types";
import "./style.css";

const SearchbarBrandWrapper = () => {
  const [searchResults, setSearchResults] = useState<searchResultType | null>(null);
  const [userInput, setUserInput] = useState("");
  const [searchTerm] = useDebounce(userInput, 700);
  useEffect(() => {
    if (!searchTerm) {
      setSearchResults(null);
    }
  }, [searchTerm]);
  return (
    <div className="flex-xl-grow-1 py-3 py-md-2 d-flex align-items-center justify-content-between pe-md-2 w-md-75 w-100 flex-wrap px-md-0 px-3" id="searchbar_brand_wrapper">
      <BrandWrapper />
      <div id="search_bar_wrapper" className="position-relative mt-md-0 mt-3 w-xl-auto">
        <div id="main_search_bar_wrapper">
          <SearchBar setSearchResults={setSearchResults} userInput={userInput} setUserInput={setUserInput} searchTerm={searchTerm} />
        </div>
        {searchResults && (
          <div className="w-100" id="search_display_wrapper">
            <SearchDisplay searchResults={searchResults} searchTerm={searchTerm} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchbarBrandWrapper;
