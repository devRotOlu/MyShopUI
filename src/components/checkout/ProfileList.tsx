import React, { useContext } from "react";

import ProfileCard from "./ProfileCard";
import ModalCloseButton from "../ModalCloseButton";

import { appContext } from "../context/AppContext";
import { checkoutContext } from "./Checkout";

const ProfileList = () => {
  const { deliveryProfiles } = useContext(appContext);
  const { setShowModal } = useContext(checkoutContext);

  const profiles = Array(deliveryProfiles.length)
    .fill(0)
    .map((_, index) => {
      return <ProfileCard key={index} profileIndex={index} />;
    });
  return (
    <>
      <div className="d-flex justify-content-between py-3 w-100 align-items-center px-3">
        <h2 className="fs-6">AddressBook</h2>
        <ModalCloseButton setShowModal={setShowModal} />
      </div>
      <div>
        <div className="d-flex justify-content-between py-4 border border-bottom-secndary px-3 align-items-center">
          <p className="fst-italic">Want to Add another address?</p>
          <button className="p-2">Add Address</button>
        </div>
        <div className="px-3 py-2 d-flex flex-column gap-2">{profiles}</div>
      </div>
    </>
  );
};

export default ProfileList;
