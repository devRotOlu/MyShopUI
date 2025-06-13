import React, { useEffect, useRef, useState } from "react";

import { sortPanelProps } from "../../types";
import "./style.css";
import { useGetQueryParams } from "../../customHooks/useGetQueryParams";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const sortButtons: { label: string; value?: "desc" | "asc" }[] = [
  {
    label: "Default",
    value: undefined,
  },
  {
    label: "Price - Hight to Low",
    value: "desc",
  },
  {
    label: "Price - Low to High",
    value: "asc",
  },
];

const SortPanel = ({ totalProducts, productPerPage, currentPage }: sortPanelProps) => {
  const navigate = useNavigate();
  const isInitialRenderRef = useRef(true);
  const { search, pathname } = useLocation();
  let queryParam = Object.fromEntries(new URLSearchParams(search));
  const { sortOrder: _sortOrder } = useGetQueryParams();
  const [sortOrder, setSortOrder] = useState<"desc" | "asc" | undefined>(_sortOrder);
  const [sortIndex, setSortIndex] = useState(0);
  const oldProducts = totalProducts * (currentPage - 1);
  const newProducts = totalProducts - oldProducts;
  const countStart = oldProducts + 1;
  const countEnd = Math.floor(newProducts % productPerPage) >= 1 ? countStart + (totalProducts - 1) : countStart + (oldProducts - 1);
  const handleClick = (sortOrder: "desc" | "asc" | undefined, index: number) => {
    setSortOrder(sortOrder);
    setSortIndex(index);
  };
  useEffect(() => {
    if (isInitialRenderRef.current) {
      isInitialRenderRef.current = false;
      return;
    }
    sortOrder && (queryParam["sortOrder"] = sortOrder);
    let url = pathname + "?" + new URLSearchParams(queryParam).toString();
    navigate(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOrder]);
  const _sortButtons = sortButtons.map(({ label, value }, index) => {
    const isActiveBtn = sortIndex === index;
    return (
      <button onClick={() => handleClick(value, index)} className={`px-3 py-1 sort_btn ${sortIndex === index ? "active_btn" : ""}`} style={{ borderColor: isActiveBtn ? "var(--lighter_pink)" : "var(--cerebral_grey)", color: isActiveBtn ? "var(--lighter_pink)" : "black" }}>
        {label}
      </button>
    );
  });
  return (
    <div id="sort_panel" className="d-flex flex-column align-items-end gap-3">
      <p className="text-end">
        {countStart} - {countEnd} of {totalProducts} results
      </p>
      <div className="d-flex gap-2 align-items-center">
        <span>Sort By:</span>
        <div>{_sortButtons}</div>
      </div>
    </div>
  );
};

export default SortPanel;
