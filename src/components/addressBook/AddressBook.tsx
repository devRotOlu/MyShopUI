import React, { useContext, useRef, MouseEvent, useState, useEffect } from "react";

import ProfileCard from "../profileCard/ProfileCard.tsx";
import ModalCloseButton from "../ModalCloseButton.tsx";

import { checkoutContext } from "../checkout/Checkout.tsx";
import { addressBookProps } from "../../types/types.ts";
import { useCalHeightOnResize } from "../../customHooks/useCalHeightOnResize.ts";
import { deliveryContext } from "../context/DeliveryProfileProvider.tsx";
import "./style.css";

const AddressBook = ({ setAddAddress }: addressBookProps) => {
  const [width, setWidth] = useState(0);
  const { deliveryProfiles } = useContext(deliveryContext);
  const { setShowModal, setProfileIndex } = useContext(checkoutContext);

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const btnWrapperRef = useRef<HTMLDivElement>(null!);
  const parentElementRef = useRef<HTMLDivElement>(null!);
  const headerRef = useRef<HTMLDivElement>(null!);

  useCalHeightOnResize(btnWrapperRef, "--useAddress_btn_wrapper");
  useCalHeightOnResize(headerRef, "--address_book_header");

  const profileIndexRef = useRef(-1);

  const handleCardClick = (profileIndex: number) => {
    profileIndexRef.current = profileIndex;
  };

  const handleBtnClick = (_: MouseEvent<HTMLButtonElement>) => {
    setProfileIndex(profileIndexRef.current);
    setShowModal(false);
  };

  useEffect(() => {
    const element = parentElementRef.current;

    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(element);

    // Cleanup on unmount
    return () => resizeObserver.disconnect();
  }, []);

  const profiles = Array(deliveryProfiles.length)
    .fill(0)
    .map((_, index) => {
      return <ProfileCard key={index} profileIndex={index} handleCardClick={handleCardClick} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />;
    });

  return (
    <div id="address_book" className="d-flex flex-wrap position-relative bg-white" ref={parentElementRef}>
      <div ref={headerRef} className="d-flex justify-content-between py-3  align-items-center px-3 position-fixed top-0 left-0 bg-white" style={{ width, zIndex: "100" }}>
        <h2 className="fs-6">AddressBook</h2>
        <ModalCloseButton setShowModal={setShowModal} />
      </div>
      <div className="w-100" id="profile_list">
        <div className="d-flex justify-content-between py-3 border border-bottom-secondary px-3 align-items-center">
          <p className="fst-italic">Want to Add another address?</p>
          <button className="p-2" onClick={() => setAddAddress(true)}>
            Add Address
          </button>
        </div>
        <div className="px-3 py-3 d-flex flex-column gap-2">{profiles}</div>
      </div>
      <div className="px-3 py-2 bg-white position-fixed left-0 bottom-0" ref={btnWrapperRef} style={{ width }}>
        <button className="py-3 px-2 w-100 text-white text-center" onClick={handleBtnClick}>
          Use this Address
        </button>
      </div>
    </div>
  );
};

export default AddressBook;
