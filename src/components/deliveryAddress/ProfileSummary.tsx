import React, { useContext } from "react";
import { Icon } from "@iconify/react";

import { profileSummaryProps } from "../../types";
import { appContext } from "../context/AppContext";

const ProfileSummary = ({ setHideProfileEdit, isEmptyProfile }: profileSummaryProps) => {
  const {
    deliveryProfile: { streetAddress, state, city, firstName, lastName, phoneNumber },
  } = useContext(appContext);

  return (
    <div className="pt-3 pb-5" id="profile_summary">
      <div className="pb-2 border-bottom border-secondary px-3 d-flex justify-content-end">
        <button onClick={() => setHideProfileEdit(false)}>Add New Address</button>
      </div>
      {!isEmptyProfile && (
        <div className="mt-3 px-3">
          <div className="py-2 border rounded pb-4" id="contact_card">
            <div className="d-flex justify-content-between pb-2 border-bottom px-3">
              <p className="fw-bold">
                Default Delivery <br />
                Address
              </p>
              <button className="d-flex gap-3 align-items-center">
                <Icon icon="material-symbols-light:delete-outline-rounded" fontSize="18" />
                <span>Delete</span>
              </button>
              <button className="d-flex gap-3 align-items-center">
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
                  {streetAddress}, {city}, <br />
                  {state}
                </p>
              </div>
              <div className="d-flex align-items-center gap-3">
                <Icon icon="lets-icons:phone-light" color="var(--dark_orange)" />
                <p>{phoneNumber}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSummary;
