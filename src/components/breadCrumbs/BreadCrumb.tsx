import React, { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

import { breadCrumbProps } from "../../types";
import "./style.css";

const BreadCrumb = ({ currentLinkLabel, handleFilterModal, children }: breadCrumbProps) => {
  const divRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const updateNavbarHeight = () => {
      if (divRef.current) {
        const height = divRef.current.offsetHeight;
        document.documentElement.style.setProperty("--bread--crumb-nav--area", `${height}px`);
      }
    };
    updateNavbarHeight();
    window.addEventListener("resize", updateNavbarHeight);
    return () => window.removeEventListener("resize", updateNavbarHeight);
  }, []);
  return (
    <div id="breadCrumb" className="bg-white w-100 mb-4">
      <div className="px-md-5 py-md-5 px-4 py-3 d-flex justify-content-between flex-md-row flex-column gap-2" ref={divRef}>
        <nav>
          <Link to="/">
            <p className="d-flex align-items-center gap-1">
              <span>Home</span>{" "}
              <span>
                <Icon icon="grommet-icons:next" />
              </span>{" "}
              <span id="current_link_label">{currentLinkLabel}</span>
            </p>
          </Link>
          <h1 className="mt-2 fs-2">{currentLinkLabel}</h1>
        </nav>
        {children}
      </div>
      <div className="w-100 bg-white d-md-none d-block pb-3" id="filter_sort_toggle_wrapper">
        <div className="w-100 mx-3" style={{ height: "5px", backgroundColor: "var(--Light_Grey)" }}></div>
        <div className="d-flex px-5 w-100 py-3">
          <div className="w-50 d-flex justify-content-center">
            <button className="d-flex gap-2" onClick={() => handleFilterModal!()}>
              <Icon icon="typcn:filter" fontSize="17px" color="var( --dark_wine)" />
              Filter
            </button>
          </div>
          <div className="w-50 d-flex justify-content-center" style={{ borderLeft: "solid thin var( --dark_wine)" }}>
            <button className="d-flex gap-2">
              <Icon icon="mi:sort" fontSize="17px" color="var( --dark_wine)" />
              Sort
            </button>
          </div>
        </div>
        <div className="w-100 mx-3" style={{ height: "3px", backgroundColor: "var(--Light_Grey)" }}></div>
      </div>
    </div>
  );
};

export default BreadCrumb;
