import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useLocation, matchPath } from "react-router-dom";
import throttle from "lodash.throttle";

import { breadCrumbProps } from "../../types";
import { useCalHeightOnResize } from "../../customHooks/useCalHeightOnResize";
import "./style.css";

const nonFilterUrls = ["/account/delivery-addresses", "/product/:productName"];

const BreadCrumb = ({ currentLinkLabel, handleFilterModal, children }: breadCrumbProps) => {
  const [isWrapped, setIsWrapped] = useState(false);
  const divRef = useRef<HTMLDivElement>(null!);

  const { pathname } = useLocation();

  const removeFilter = nonFilterUrls.some((url) => {
    return Boolean(matchPath(url, pathname)) === true;
  });

  useCalHeightOnResize(divRef.current, "--bread--crumb-nav--area");

  useEffect(() => {
    const checkWrapping = () => {
      const items = Array.from(divRef.current.children) as HTMLElement[];
      const firstItemTop = items[0].offsetTop;
      const isWrapped = items.some((item) => item.offsetTop !== firstItemTop);
      setIsWrapped(isWrapped);
    };
    checkWrapping();
    const handleResize = throttle(() => {
      checkWrapping();
    }, 100);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div id="breadCrumb" className="bg-white w-100 mb-5">
      <div className={`px-lg-5 py-md-5 px-3 py-3 d-flex justify-content-${isWrapped ? "center" : "start"} flex-wrap flex-md-row flex-column`} ref={divRef}>
        <nav className={`flex-grow-1 d-flex gap-2 flex-column align-items-${isWrapped ? "center" : "start"}`}>
          <Link to="/" className="d-md-flex d-none">
            <p className="d-flex align-items-center gap-1">
              <span>Home</span>{" "}
              <span>
                <Icon icon="grommet-icons:next" />
              </span>{" "}
              <span id="current_link_label">{currentLinkLabel}</span>
            </p>
          </Link>
          <h1 className="fs-2">{currentLinkLabel}</h1>
        </nav>
        <div className="d-flex justify-content-start">{children}</div>
      </div>
      {!removeFilter && (
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
      )}
    </div>
  );
};

export default BreadCrumb;
