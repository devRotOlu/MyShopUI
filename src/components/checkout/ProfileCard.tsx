import React, { useContext } from "react";

import { profileCardProps } from "../../types";
import { appContext } from "../context/AppContext";
import { Icon } from "@iconify/react";

const ProfileCard = ({ profileIndex }: profileCardProps) => {
  const { deliveryProfiles } = useContext(appContext);
  const { firstName, lastName, streetAddress, city, state, phoneNumber } = deliveryProfiles[profileIndex];
  return (
    <div className="border w-100 pb-4 profileCard">
      <div className="py-2 px-1  border-bottom">
        <label>
          <input type="radio" name="profile" />
          <span className="ms-2">
            {firstName} {lastName}
          </span>
        </label>
      </div>
      <div className="pt-2 px-1">
        <div className="d-flex gap-2 align-items-center">
          <Icon icon="iconamoon:profile-thin" color="var(--dark_orange)" />
          <p>
            {firstName} {lastName}
          </p>
        </div>
        <div className="mt-3 d-flex gap-2 align-items-center">
          <Icon icon="ion:location-outline" color="var(--dark_orange)" />
          <p>
            {streetAddress}, {city}, {state}
          </p>
        </div>
        <div className="mt-3 d-flex gap-2 align-items-center">
          <Icon icon="lets-icons:phone-light" color="var(--dark_orange)" />
          <p>{phoneNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
