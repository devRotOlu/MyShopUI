import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { sortPanelProps } from "../../types/types";
import "./style.css";
import { useGetQueryParams } from "../../customHooks/useGetQueryParams";
import { appContext } from "../context/AppProvider";

const sortButtons: { label: string; value?: "desc" | "asc" }[] = [
  {
    label: "Relevance",
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
  const { sortIndex, setSortIndex } = useContext(appContext);
  const navigate = useNavigate();
  const isInitialRenderRef = useRef(true);
  const { search, pathname } = useLocation();
  const queryParam = useMemo(() => {
    return Object.fromEntries(new URLSearchParams(search));
  }, [search]);
  const { sortOrder: _sortOrder } = useGetQueryParams();
  const [sortOrder, setSortOrder] = useState<"desc" | "asc" | undefined>(_sortOrder);
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
    if (sortOrder) queryParam["sortOrder"] = sortOrder;
    else delete queryParam["sortOrder"];

    const url = pathname + "?" + new URLSearchParams(queryParam).toString();
    navigate(url);
  }, [sortOrder, pathname, navigate, search, queryParam]);

  const _sortButtons = sortButtons.map(({ label, value }, index) => {
    const isActiveBtn = sortIndex === index;
    return (
      <button key={index} onClick={() => handleClick(value, index)} className={`px-3 py-1 sort_btn ${sortIndex === index ? "active_btn" : ""}`} style={{ borderColor: isActiveBtn ? "var(--lighter_pink)" : "var(--cerebral_grey)", color: isActiveBtn ? "var(--lighter_pink)" : "black" }}>
        {label}
      </button>
    );
  });
  return (
    <div id="sort_panel" className="d-flex flex-column align-items-end gap-3">
      <p className="text-md-end text-center w-100">
        {countStart} - {countEnd} of {totalProducts} results
      </p>
      <div className="d-none d-md-flex gap-2 align-items-center">
        <span>Sort By:</span>
        <div>{_sortButtons}</div>
      </div>
    </div>
  );
};

export default SortPanel;
