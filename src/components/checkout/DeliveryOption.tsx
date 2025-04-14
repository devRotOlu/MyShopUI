import React, { useContext } from "react";

import DeliveryAddress from "./DeliveryAddress";
import ChangeDeliveryAddress from "./ChangeDeliveryAddress";

import { Icon } from "@iconify/react";
import { checkoutContext } from "./Checkout";

const DeliveryOption = () => {
  const { profileIndex, setProfileIndex } = useContext(checkoutContext);

  const iconColor = profileIndex >= 0 ? "var( --light_Green)" : "var(--darker_Grey)";
  const headerBg = profileIndex >= 0 ? "white" : "var(--lavender_blush)";
  return (
    <div className="" id="delivery_option">
      <div className="d-flex py-2 border-bottom justify-content-between align-items-center" style={{ backgroundColor: headerBg }}>
        <h2 className="fs-6">
          <Icon icon="pixel:check-circle-solid" className="fs-4" color={iconColor} />
          <span className="ms-2">1. Choose Delivery Option</span>
        </h2>
        {profileIndex >= 0 && (
          <button id="change_address_btn" className="px-3 py-2" onClick={() => setProfileIndex(-1)}>
            Change
          </button>
        )}
      </div>
      {profileIndex < 0 && <ChangeDeliveryAddress />}
      {profileIndex >= 0 && <DeliveryAddress />}
    </div>
  );
};

export default DeliveryOption;
