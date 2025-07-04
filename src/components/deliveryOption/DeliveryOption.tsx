import React, { useContext } from "react";

import DeliveryProfile from "../deliveryProfile/DeliveryProfile";
import ChangeDeliveryAddress from "../changeDeliveryAddress/ChangeDeliveryAddress";

import { Icon } from "@iconify/react";
import { checkoutContext } from "../checkout/Checkout";
import "./style.css";

const DeliveryOption = () => {
  const { profileIndex, setProfileIndex } = useContext(checkoutContext);

  const isProfileIndex = profileIndex >= 0;
  const iconColor = isProfileIndex ? "var(--light_Green)" : "var(--darker_Grey)";
  const headerBg = isProfileIndex ? "white" : "var(--lavender_blush)";
  return (
    <div id="delivery_option">
      <div>
        <div className={`d-flex py-2 ${isProfileIndex ? "border-bottom" : ""} justify-content-between align-items-center`} style={{ backgroundColor: headerBg, borderColor: headerBg }}>
          <h2 className="fs-6 d-flex align-items-center">
            <Icon icon="pixel:check-circle-solid" className="fs-4 flex-shrink-0" color={iconColor} />
            <span className="ms-2">1. Choose Delivery Option</span>
          </h2>
          {profileIndex >= 0 && (
            <button id="change_address_btn" className="px-sm-3 px-1 py-2" onClick={() => setProfileIndex(-1)}>
              Change
            </button>
          )}
        </div>
        {profileIndex < 0 && <ChangeDeliveryAddress />}
        {profileIndex >= 0 && <DeliveryProfile />}
      </div>
    </div>
  );
};

export default DeliveryOption;
