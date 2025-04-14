import React, { useContext, MouseEvent } from "react";

import { profileCardProps } from "../../types";
import { Icon } from "@iconify/react";
import { deliveryContext } from "../context/DeliveryProfileProvider";

const ProfileCard = ({ ...props }: profileCardProps) => {
  const { profileIndex, handleCardClick, selectedIndex, setSelectedIndex } = props;
  const { deliveryProfiles } = useContext(deliveryContext);

  const { firstName, lastName, streetAddress, city, state, phoneNumber } = deliveryProfiles[profileIndex];

  const borderColor = selectedIndex === profileIndex ? "var(--dark_orange)" : "var(--darker_Grey)";
  const bgColor = selectedIndex === profileIndex ? "var(--lavender_blush)" : "";

  const handleBtnClick = (_: MouseEvent<HTMLDivElement>) => {
    handleCardClick(profileIndex);
    setSelectedIndex(profileIndex);
  };

  return (
    <div className="w-100 pb-4 profileCard" onClick={handleBtnClick} style={{ border: `solid thin ${borderColor}`, backgroundColor: bgColor }}>
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
