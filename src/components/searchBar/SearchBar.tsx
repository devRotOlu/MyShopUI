import React, { ChangeEvent, FormEvent, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";

import "./style.css";
import { searchProduct } from "../../helperFunctions/dataFetchFunctions";
import { searchBarProps } from "../../types";

const SearchBar = ({ ...props }: searchBarProps) => {
  const { setSearchResults, setUserInput, searchTerm, userInput } = props;
  const { isSuccess, data, refetch } = useQuery({
    queryKey: ["search_results"],
    queryFn: () => searchProduct(searchTerm),
    enabled: false,
  });
  useEffect(() => {
    if (searchTerm) {
      console.log(searchTerm);
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);
  useEffect(() => {
    if (isSuccess) {
      const products = data?.data;
      setSearchResults(products);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data]);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setUserInput(value);
  };
  return (
    <form onSubmit={handleSubmit} className="input-group" id="search_bar">
      <input value={userInput} onChange={handleSearch} type="text" className="form-control" placeholder="search product by name or category" aria-label="search bar" aria-describedby="basic-addon2" />
      <button type="submit" className="input-group-text" id="basic-addon2">
        <Icon icon="ic:baseline-search" color="white" />
      </button>
    </form>
  );
};

export default SearchBar;
