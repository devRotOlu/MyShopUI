import React, { useContext, MouseEvent } from "react";
import { Icon } from "@iconify/react";

import { profileSummaryProps } from "../../types";
import { deliveryContext } from "../context/DeliveryProfileProvider";
import "./style.css";

const ProfileSummary = ({ setPageIndex, profileIndex, setProfileofInterestIndex, setShowModal }: profileSummaryProps) => {
  const { deliveryProfiles } = useContext(deliveryContext);

  const { streetAddress, state, city, firstName, lastName, phoneNumber, isDefaultProfile } = deliveryProfiles[profileIndex];

  const handleProfileDeletion = (_: MouseEvent<HTMLButtonElement>) => {
    setProfileofInterestIndex(profileIndex);
    setShowModal(true);
  };

  const handleProfileEdit = (_: MouseEvent<HTMLButtonElement>) => {
    setProfileofInterestIndex(profileIndex);
    setPageIndex("1");
  };

  return (
    <div className="px-md-3 px-sm-2 px-1 profile_summary">
      <div className="py-2 border rounded pb-4 contact_card w-100">
        <div className="d-flex justify-content-between pb-2 border-bottom px-3 align-items-center">
          {isDefaultProfile && <p className="fw-bold">Default Address</p>}
          <div className="d-flex justify-content-end flex-grow-1 gap-lg-5 gap-sm-3 gap-1 edit_delete_btn_wrapper">
            <button onClick={handleProfileDeletion} className="d-flex gap-1 align-items-center text-secondary py-1 px-sm-2 px-1 fw-light" style={{ fontSize: "13px" }}>
              <Icon icon="material-symbols-light:delete-outline-rounded" fontSize="18" />
              <span>Delete</span>
            </button>
            <button className="d-flex gap-1 align-items-center py-1 px-sm-2 px-1 fw-light" onClick={handleProfileEdit} style={{ color: "var( --lighter_pink)", fontSize: "13px" }}>
              <Icon icon="material-symbols-light:edit-square-outline-rounded" fontSize="18" />
              <span>Edit</span>
            </button>
          </div>
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
