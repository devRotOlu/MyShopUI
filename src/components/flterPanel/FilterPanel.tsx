import React, { useEffect, useRef } from "react";

import ProductRatings from "../product/ProductRatings";

import { filterPanelProps } from "../../types";
import { prices } from "../../data";
import "./style.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const FilterPanel = ({ filterPanelData }: filterPanelProps) => {
  const { products, selectedPrices, setSelectedPrices, selectedRating, setSelectedRating } = filterPanelData;
  const isInitialRenderRef = useRef(true);
  const location = useLocation();
  const navigate = useNavigate();
  const categories = new Set<string>();
  const ratings = new Set<number>();
  for (let index = 0; index < products.length; index++) {
    const {
      category: { name },
      averageRating,
    } = products[index];
    categories.add(name);
    ratings.add(Math.floor(averageRating));
  }

  const { minPrice, maxPrice } = selectedPrices;

  useEffect(() => {
    if (isInitialRenderRef.current) {
      isInitialRenderRef.current = false;
      return;
    }
    let queryParam = "";
    if (minPrice) queryParam += `min=${minPrice}`;
    if (maxPrice) queryParam += `${queryParam.length ? "&" : ""}max=${maxPrice}`;
    if (selectedRating !== null) queryParam += `${queryParam.length ? "&" : ""}rating=${selectedRating}`;
    let url = queryParam ? location.pathname + "?" + queryParam : location.pathname;
    navigate(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minPrice, maxPrice, selectedRating]);

  const _categories = Array.from(categories).map((category, index) => {
    return (
      <li key={index}>
        <button>{category}</button>
      </li>
    );
  });

  const priceList = prices.map((price, index) => {
    const { label, minPrice, maxPrice } = price;
    return (
      <li key={index}>
        <label>
          <input onChange={() => setSelectedPrices((prevPrice) => ({ ...prevPrice, minPrice, maxPrice }))} type="radio" name="price" />
          &nbsp;&nbsp; {label}
        </label>
      </li>
    );
  });
  const _ratings = Array(4)
    .fill(0)
    .map((_, index) => {
      const rating = 4 - index;
      return (
        <li key={rating}>
          <label className="d-flex align-items-center">
            <input onChange={() => setSelectedRating(rating)} type="radio" name="rating" />
            &nbsp;&nbsp;
            <ProductRatings size={22} rating={rating} />
            &nbsp;&nbsp; & up
          </label>
        </li>
      );
    });
  return (
    <div className="bg-white" id="filter_panel">
      <div className="pt-3 pb-2 px-3 border-bottom ">
        <p className="mb-2 fw-bold">Browse Categories</p>
        <ul className="m-0 p-0">{_categories}</ul>
      </div>
      <div className="py-2 px-3 border-bottom">
        <p className="mb-2 fw-bold">Price</p>
        <ul className="m-0 p-0 d-flex flex-column gap-1">{priceList}</ul>
      </div>
      <div className="py-2 px-3">
        <p className="mb-2 fw-bold">Rating</p>
        <ul className="m-0 p-0 d-flex flex-column gap-1">{_ratings}</ul>
      </div>
    </div>
  );
};

export default FilterPanel;
