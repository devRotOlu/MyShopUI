import React, { ChangeEvent, FormEvent, useEffect, useRef, FocusEvent, MouseEvent } from "react";
import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";

import "./style.css";
import { searchProduct } from "../../helperFunctions/dataFetchFunctions";
import { searchBarProps } from "../../types/types";

const SearchBar = ({ ...props }: searchBarProps) => {
  const { setSearchResults, setUserInput, searchTerm, userInput, setIsFocused } = props;
  const { data, dataUpdatedAt, refetch } = useQuery({
    queryKey: ["search_results"],
    queryFn: () => searchProduct(searchTerm),
    enabled: false,
  });
  const dataUpdatedAtRef = useRef(dataUpdatedAt);
  useEffect(() => {
    if (searchTerm) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  useEffect(() => {
    if (dataUpdatedAt !== dataUpdatedAtRef.current) {
      dataUpdatedAtRef.current = dataUpdatedAt;
      const products = data?.data;
      setSearchResults(products);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, dataUpdatedAt]);
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
  const handleClick = (event: MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
  };
  return (
    <form onSubmit={handleSubmit} className="input-group w-100" id="search_bar">
      <input onClick={handleClick} onFocus={handleFocus} value={userInput} onChange={handleSearch} type="text" className="form-control" placeholder="Search for products, brands, and categories..." aria-label="search bar" aria-describedby="basic-addon2" />
      <button type="submit" className="input-group-text" id="basic-addon2">
        <Icon id="search_icon" icon="ic:baseline-search" />
      </button>
    </form>
  );
};

export default SearchBar;
