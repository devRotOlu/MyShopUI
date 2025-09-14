import React, { useEffect, useRef, useState, MouseEventHandler } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

import ProductRatings from "../productRating/ProductRatings";

import { filterPanelProps, selectedPricesType } from "../../types/types";
import { prices } from "../../data";
import "./style.css";
import { useGetQueryParams } from "../../customHooks/useGetQueryParams";

const FilterPanel = ({ products }: filterPanelProps) => {
  const { search, pathname } = useLocation();
  const queryParam = Object.fromEntries(new URLSearchParams(search));
  const { min, max, rating } = useGetQueryParams();
  const [selectedPrices, setSelectedPrices] = useState<selectedPricesType>({ minPrice: min, maxPrice: max });
  const [selectedRating, setSelectedRating] = useState<number | undefined>(rating);
  const [isExpand, setIsExpand] = useState({
    isExpandCategory: true,
    isExpandPriceList: true,
    isExpandRatings: true,
  });
  const isInitialRenderRef = useRef(true);
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
    if (minPrice || maxPrice) {
      delete queryParam["min"];
      delete queryParam["max"];
      if (minPrice) queryParam["min"] = minPrice.toString();
      if (maxPrice) queryParam["max"] = maxPrice.toString();
    }

    if (selectedRating) queryParam["rating"] = selectedRating.toString();
    const url = pathname + "?" + new URLSearchParams(queryParam).toString();
    navigate(url);
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
  const handleCategoryToggle: MouseEventHandler<HTMLButtonElement> = () => {
    setIsExpand((prevObj) => ({ ...prevObj, isExpandCategory: !prevObj.isExpandCategory }));
  };
  const handlePriceListToggle: MouseEventHandler<HTMLButtonElement> = () => {
    setIsExpand((prevObj) => ({ ...prevObj, isExpandPriceList: !prevObj.isExpandPriceList }));
  };
  const handleRatingsToggle: MouseEventHandler<HTMLButtonElement> = () => {
    setIsExpand((prevObj) => ({ ...prevObj, isExpandRatings: !prevObj.isExpandRatings }));
  };
  return (
    <div className="bg-white" id="filter_panel">
      <div className="pt-3 pb-2 px-3 border-bottom ">
        <div className="mb-2 d-flex justify-content-between align-items-center">
          <p className="fw-bold list_header">Browse Categories</p>
          <div>
            {isExpandCategory ? (
              <button aria-label="expand-category" onClick={handleCategoryToggle}>
                <Icon icon="charm:plus" fontSize={20} />
              </button>
            ) : (
              <button aria-label="minimize-category" onClick={handleCategoryToggle}>
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
              <button aria-label="expand-list" onClick={handlePriceListToggle}>
                <Icon icon="charm:plus" fontSize={20} />
              </button>
            ) : (
              <button aria-label="minimize-list" onClick={handlePriceListToggle}>
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
              <button aria-label="expand-ratings" onClick={handleRatingsToggle}>
                <Icon icon="charm:plus" fontSize={20} />
              </button>
            ) : (
              <button aria-label="minimize-ratings" onClick={handleRatingsToggle}>
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
