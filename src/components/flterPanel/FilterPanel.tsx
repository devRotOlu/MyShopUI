import React, { useEffect, useRef, useState, MouseEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

import ProductRatings from "../productRating/ProductRatings";

import { filterPanelProps } from "../../types";
import { prices } from "../../data";
import "./style.css";

const FilterPanel = ({ filterPanelData }: filterPanelProps) => {
  const [isExpand, setIsExpand] = useState({
    isExpandCategory: true,
    isExpandPriceList: true,
    isExpandRatings: true,
  });
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
        <button className="fw-light category">{category}</button>
      </li>
    );
  });

  const priceList = prices.map((price, index) => {
    const { label, minPrice, maxPrice } = price;
    return (
      <li key={index}>
        <label className="filter_label">
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
          <label className="d-flex align-items-center filter_label">
            <input onChange={() => setSelectedRating(rating)} type="radio" name="rating" />
            &nbsp;&nbsp;
            <ProductRatings styles="fs-5" rating={rating} />
            &nbsp;&nbsp; & up
          </label>
        </li>
      );
    });
  const { isExpandCategory, isExpandPriceList, isExpandRatings } = isExpand;
  const handleCategoryToggle = (_: MouseEvent<HTMLButtonElement>) => {
    setIsExpand((prevObj) => ({ ...prevObj, isExpandCategory: !prevObj.isExpandCategory }));
  };
  const handlePriceListToggle = (_: MouseEvent<HTMLButtonElement>) => {
    setIsExpand((prevObj) => ({ ...prevObj, isExpandPriceList: !prevObj.isExpandPriceList }));
  };
  const handleRatingsToggle = (_: MouseEvent<HTMLButtonElement>) => {
    setIsExpand((prevObj) => ({ ...prevObj, isExpandRatings: !prevObj.isExpandRatings }));
  };
  return (
    <div className="bg-white" id="filter_panel">
      <div className="pt-3 pb-2 px-3 border-bottom ">
        <div className="mb-2 d-flex justify-content-between align-items-center">
          <p className="fw-bold list_header">Browse Categories</p>
          <div>
            {isExpandCategory ? (
              <button onClick={handleCategoryToggle}>
                <Icon icon="charm:plus" fontSize={20} />
              </button>
            ) : (
              <button onClick={handleCategoryToggle}>
                <Icon icon="charm:minus" fontSize={20} />
              </button>
            )}
          </div>
        </div>
        {isExpandCategory && <ul className="m-0 p-0">{_categories}</ul>}
      </div>
      <div className="py-2 px-3 border-bottom">
        <div className="mb-2 d-flex justify-content-between align-items-center">
          <p className="fw-bold list_header">Price</p>
          <div>
            {isExpandPriceList ? (
              <button onClick={handlePriceListToggle}>
                <Icon icon="charm:plus" fontSize={20} />
              </button>
            ) : (
              <button onClick={handlePriceListToggle}>
                <Icon icon="charm:minus" fontSize={20} />
              </button>
            )}
          </div>
        </div>
        {isExpandPriceList && <ul className="m-0 p-0 d-flex flex-column gap-1">{priceList}</ul>}
      </div>
      <div className="py-2 px-3">
        <div className="mb-2 d-flex justify-content-between align-items-center">
          <p className="fw-bold list_header">Rating</p>
          <div>
            {isExpandRatings ? (
              <button onClick={handleRatingsToggle}>
                <Icon icon="charm:plus" fontSize={20} />
              </button>
            ) : (
              <button onClick={handleRatingsToggle}>
                <Icon icon="charm:minus" fontSize={20} />
              </button>
            )}
          </div>
        </div>
        {isExpandRatings && <ul className="m-0 p-0 d-flex flex-column gap-1">{_ratings}</ul>}
      </div>
    </div>
  );
};

export default FilterPanel;
