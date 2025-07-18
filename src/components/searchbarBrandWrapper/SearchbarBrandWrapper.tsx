import React, { useEffect, useState, MouseEvent } from "react";
import { useDebounce } from "use-debounce";

import SearchBar from "../searchBar/SearchBar";
import SearchDisplay from "../searchDisplay/SearchDisplay";
import BrandWrapper from "../brandWrapper/BrandWrapper";

import { searchbarBrandWrapperProps, searchResultType } from "../../types";
import "./style.css";
import { useLocation } from "react-router-dom";

const SearchbarBrandWrapper = ({ hideSearcbar }: searchbarBrandWrapperProps) => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState<searchResultType | null>(null);
  const [displaySearchResults, setDisplaySearchResults] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [searchTerm] = useDebounce(userInput, 700);

  useEffect(() => {
    setIsFocused(false);
  }, [location]);

  useEffect(() => {
    if (isFocused && searchResults) {
      setDisplaySearchResults(true);
    } else {
      setDisplaySearchResults(false);
    }
  }, [isFocused, searchResults]);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  useEffect(() => {
    window.addEventListener("click", () => {
      setIsFocused(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex-xl-grow-1 py-3 py-md-2 d-flex align-items-center justify-content-between pe-md-2 w-md-75 w-100 flex-wrap px-md-0 px-3" id="searchbar_brand_wrapper">
      <BrandWrapper />
      <div id="search_bar_wrapper" className="position-relative mt-md-0 mt-3 w-xl-auto">
        <div className={`d-${hideSearcbar ? "none" : ""}`} id="main_search_bar_wrapper">
          <SearchBar setSearchResults={setSearchResults} userInput={userInput} setUserInput={setUserInput} searchTerm={searchTerm} setIsFocused={setIsFocused} />
        </div>
        {displaySearchResults && (
          <div className="w-100" id="search_display_wrapper" onClick={handleClick}>
            <SearchDisplay searchResults={searchResults} searchTerm={searchTerm} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchbarBrandWrapper;
