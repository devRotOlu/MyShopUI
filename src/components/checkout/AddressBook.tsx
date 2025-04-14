import React, { useContext, useRef, MouseEvent, useState } from "react";

import ProfileCard from "./ProfileCard.tsx";
import ModalCloseButton from "../ModalCloseButton.tsx";
import ComponentOverlay from "../ComponentOverlay.tsx.tsx";

import { checkoutContext } from "./Checkout.tsx";
import { addressBookProps } from "../../types.ts";
import { deliveryContext } from "../context/DeliveryProfileProvider.tsx";

const AddressBook = ({ setAddAddress }: addressBookProps) => {
  const { deliveryProfiles } = useContext(deliveryContext);
  const { setShowModal, setProfileIndex } = useContext(checkoutContext);

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const profileIndexRef = useRef(-1);

  const handleCardClick = (profileIndex: number) => {
    profileIndexRef.current = profileIndex;
  };

  const handleBtnClick = (_: MouseEvent<HTMLButtonElement>) => {
    setProfileIndex(profileIndexRef.current);
    setShowModal(false);
  };

  const profiles = Array(deliveryProfiles.length)
    .fill(0)
    .map((_, index) => {
      return <ProfileCard key={index} profileIndex={index} handleCardClick={handleCardClick} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />;
    });

  return (
    <div id="address_book" className="h-100 d-flex flex-column">
      <div className="d-flex justify-content-between py-3 w-100 align-items-center px-3 w-100">
        <h2 className="fs-6">AddressBook</h2>
        <ModalCloseButton setShowModal={setShowModal} />
      </div>
      <div className="position-relative flex-grow-1" id="profile_list">
        <div className="w-100">
          <div className="d-flex justify-content-between py-3 border border-bottom-secndary px-3 align-items-center">
            <p className="fst-italic">Want to Add another address?</p>
            <button className="p-2" onClick={() => setAddAddress(true)}>
              Add Address
            </button>
          </div>
          <div className="px-3 py-3 d-flex flex-column gap-2">{profiles}</div>
        </div>
        <div>
          <div className="px-3 py-2 position-relative">
            <button className="py-3 px-2 w-100 text-white" onClick={handleBtnClick}>
              Use this Address
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressBook;
