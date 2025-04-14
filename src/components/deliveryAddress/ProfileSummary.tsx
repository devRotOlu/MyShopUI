import React, { useContext, MouseEvent } from "react";
import { Icon } from "@iconify/react";

import { profileSummaryProps } from "../../types";
import { deliveryContext } from "../context/DeliveryProfileProvider";

const ProfileSummary = ({ setPageIndex, profileIndex, setProfileofInterestIndex, setShowModal }: profileSummaryProps) => {
  const { deliveryProfiles } = useContext(deliveryContext);

  const { streetAddress, state, city, firstName, lastName, phoneNumber } = deliveryProfiles[profileIndex];

  const handleProfileDeletion = (_: MouseEvent<HTMLButtonElement>) => {
    setProfileofInterestIndex(profileIndex);
    setShowModal(true);
  };

  const handleProfileEdit = (_: MouseEvent<HTMLButtonElement>) => {
    setProfileofInterestIndex(profileIndex);
    setPageIndex("1");
  };

  return (
    <div className="px-3 profile_summary">
      <div className="py-2 border rounded pb-4 contact_card">
        <div className="d-flex justify-content-between pb-2 border-bottom px-3">
          <p className="fw-bold">
            Default Delivery <br />
            Address
          </p>
          <button onClick={handleProfileDeletion} className="d-flex gap-3 align-items-center text-secondary">
            <Icon icon="material-symbols-light:delete-outline-rounded" fontSize="18" />
            <span>Delete</span>
          </button>
          <button className="d-flex gap-3 align-items-center" onClick={handleProfileEdit} style={{ color: "var( --lighter_pink)" }}>
            <Icon icon="material-symbols-light:edit-square-outline-rounded" fontSize="18" />
            <span>Edit</span>
          </button>
        </div>
        <div className="d-flex flex-column gap-2 px-3 pt-2">
          <div className="d-flex align-items-center gap-3">
            <Icon icon="iconamoon:profile-thin" color="var(--dark_orange)" />
            <p>
              {firstName}, {lastName}
            </p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <Icon icon="ion:location-outline" color="var(--dark_orange)" />
            <p>
              {streetAddress}, {city}, {state}
            </p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <Icon icon="lets-icons:phone-light" color="var(--dark_orange)" />
            <p>{phoneNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSummary;
