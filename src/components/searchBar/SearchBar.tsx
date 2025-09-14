import React, { ChangeEvent, FormEvent, useEffect, FocusEvent } from "react";
import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";

import "./style.css";
import { searchProduct } from "../../helperFunctions/dataFetchFunctions";
import { searchBarProps } from "../../types/types";

const SearchBar = ({ ...props }: searchBarProps) => {
  const { setSearchResults, setUserInput, searchTerm, userInput, setIsFocused } = props;
  const { data, refetch } = useQuery({
    queryKey: ["search_results"],
    queryFn: () => searchProduct(searchTerm),
    enabled: false,
  });
  useEffect(() => {
    if (searchTerm) {
      refetch();
    }
  }, [searchTerm, refetch]);

  useEffect(() => {
    if (data) {
      const products = data?.data;
      setSearchResults(products);
    }
  }, [data, setSearchResults]);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setUserInput(value);
  };
  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setIsFocused(true);
  };
  return (
    <form role="search" onSubmit={handleSubmit} className="input-group w-100" id="search_bar">
      <input onMouseDown={(e) => e.stopPropagation()} onFocus={handleFocus} value={userInput} onChange={handleSearch} type="text" className="form-control" placeholder="Search for products, brands, and categories..." aria-label="search bar" aria-describedby="basic-addon2" />
      <button aria-label="search" type="submit" className="input-group-text" id="basic-addon2">
        <Icon id="search_icon" icon="ic:baseline-search" />
      </button>
    </form>
  );
};

export default SearchBar;
