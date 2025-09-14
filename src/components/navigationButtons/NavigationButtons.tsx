import React, { MouseEventHandler, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

import { navigationButtonsProps } from "../../types/types";
import "./style.css";

const NavigationButtons = <T,>({ params }: navigationButtonsProps<T>) => {
  const { itemCount, maxItemPerPage, setCurrentItems, items, setCurrentPage, currentPage, firstPage, currentItems } = params;
  const maxPage = Math.ceil(itemCount / maxItemPerPage);
  const initialIndex = maxPage >= 1 ? maxItemPerPage - 1 : itemCount - 1;
  const prevIndexRef = useRef(initialIndex);
  const currentIndexRef = useRef(initialIndex);

  const handleNextBtnClick: MouseEventHandler<HTMLButtonElement> = () => {
    const isNextPage = currentIndexRef.current < itemCount - 1;
    if (isNextPage) {
      setCurrentPage((prevIndex) => (prevIndex !== maxPage ? ++prevIndex : prevIndex));
      prevIndexRef.current = currentIndexRef.current;
      currentIndexRef.current = itemCount - (currentIndexRef.current + 1) >= maxItemPerPage ? maxItemPerPage + currentIndexRef.current : itemCount - 1;
      const currentItems = items.filter((_, index) => {
        return index > prevIndexRef.current && index <= currentIndexRef.current;
      });
      setCurrentItems(currentItems);
    }
  };
  const handlePreviousBtnClick: MouseEventHandler<HTMLButtonElement> = () => {
    const isPreviousPage = initialIndex !== currentIndexRef.current;
    if (isPreviousPage) {
      setCurrentPage((prevIndex) => (prevIndex !== firstPage ? --prevIndex : prevIndex));
      currentIndexRef.current = prevIndexRef.current;
      prevIndexRef.current = currentIndexRef.current - maxItemPerPage;
      const currentItems = items.filter((_, index) => {
        return index > prevIndexRef.current && index <= currentIndexRef.current;
      });
      setCurrentItems(currentItems);
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

  if (!currentItems.length) {
    return null;
  }
  return (
    <div className="d-flex justify-content-center w-100 align-items-center gap-3" id="navigation_buttons">
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
