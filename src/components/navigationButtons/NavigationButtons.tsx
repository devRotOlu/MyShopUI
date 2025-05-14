import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";

import { navigationButtonsProps } from "../../types";
import "./style.css";

const firstPage = 1;

const NavigationButtons = ({ ...props }: navigationButtonsProps) => {
  const { itemCount, maxItemPerPage, setCurrentItems, items } = props;
  const lowestIndexRef = useRef(maxItemPerPage - 1);
  const currentIndexRef = useRef(maxItemPerPage - 1);
  const [currentPage, setCurrentPage] = useState(firstPage);
  const maxPage = Math.ceil(itemCount / maxItemPerPage);
  const handleNextBtnClick = (_: MouseEvent<HTMLButtonElement>) => {
    const isNextPage = currentIndexRef.current < itemCount - 1;
    if (isNextPage) {
      setCurrentPage((prevIndex) => (prevIndex !== maxPage ? ++prevIndex : prevIndex));
      const upperBound = itemCount - (currentIndexRef.current + 1) >= maxItemPerPage ? maxItemPerPage + currentIndexRef.current : itemCount - 1;
      const currentItems = items.filter((_, index) => {
        return index > currentIndexRef.current && index <= upperBound;
      });
      setCurrentItems(currentItems);
      currentIndexRef.current = upperBound;
    }
  };
  const handlePreviousBtnClick = (_: MouseEvent<HTMLButtonElement>) => {
    const isPreviousPage = lowestIndexRef.current !== currentIndexRef.current;
    if (isPreviousPage) {
      setCurrentPage((prevIndex) => (prevIndex !== firstPage ? --prevIndex : prevIndex));
      const upperBound = currentIndexRef.current - maxItemPerPage;
      const lowerBound = upperBound - maxItemPerPage + 1;
      const currentItems = items.filter((_, index) => {
        return index >= lowerBound && index <= upperBound;
      });
      setCurrentItems(currentItems);
      currentIndexRef.current = upperBound;
    }
  };

  useEffect(() => {
    const currentItems = items.filter((_, index) => {
      return index < maxItemPerPage;
    });
    setCurrentItems(currentItems);
  }, [items, maxItemPerPage, setCurrentItems]);

  const pageIndicators = Array(maxPage)
    .fill(0)
    .map((_, index) => {
      const isCurrentIndex = currentPage === index + 1;
      return (
        <span className="page_indicator" key={index} style={{ backgroundColor: isCurrentIndex ? "var(--lighter_pink)" : "", color: isCurrentIndex ? "white" : "" }}>
          {index + 1}
        </span>
      );
    });
  return (
    <div className="my-3 d-flex justify-content-center w-100 align-items-center gap-3" id="navigation_buttons">
      <button disabled={currentPage === firstPage} onClick={handlePreviousBtnClick} className="d-flex align-items-center gap-1 py-1 px-2" id="previous_btn" style={{ color: currentPage !== firstPage ? "black" : "", backgroundColor: currentPage !== firstPage ? "var(--cerebral_grey)" : "" }}>
        <Icon icon="grommet-icons:form-previous" fontSize={15} />
        Previous
      </button>
      <div>{pageIndicators}</div>
      <button disabled={currentPage === maxPage} className="d-flex align-items-center gap-1 py-1 px-2" id="next_btn" onClick={handleNextBtnClick} style={{ color: currentPage !== maxPage ? "black" : "", backgroundColor: currentPage !== maxPage ? "var(--cerebral_grey)" : "" }}>
        Next
        <Icon icon="grommet-icons:form-next" fontSize={15} />
      </button>
    </div>
  );
};

export default NavigationButtons;
