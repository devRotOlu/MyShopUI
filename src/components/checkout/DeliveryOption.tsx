import React, { useContext, useEffect, useRef, useState } from "react";

import DeliveryAddress from "./DeliveryAddress";
import ChangeDeliveryAddress from "./ChangeDeliveryAddress";

import { appContext } from "../context/AppContext";
import { deliveryDataType } from "../../types";
import { Icon } from "@iconify/react";

const DeliveryOption = () => {
  const { deliveryProfiles } = useContext(appContext);

  const [selectedProfile, setSelectedProfile] = useState<deliveryDataType | undefined>(undefined);

  const isInitialProfileRef = useRef(false);

  useEffect(() => {
    if (deliveryProfiles.length && !isInitialProfileRef.current) {
      setSelectedProfile(deliveryProfiles[0]);
      isInitialProfileRef.current = true;
    }
  }, [deliveryProfiles, deliveryProfiles.length]);

  const iconColor = selectedProfile ? "var( --light_Green)" : "var(--darker_Grey)";
  const headerBg = selectedProfile ? "white" : "var(--lavender_blush)";
  return (
    <div className="" id="delivery_option">
      <div className="d-flex py-2 border-bottom justify-content-between align-items-center" style={{ backgroundColor: headerBg }}>
        <h2 className="fs-6">
          <Icon icon="pixel:check-circle-solid" className="fs-4" color={iconColor} />
          <span className="ms-2">1. Choose Delivery Option</span>
        </h2>
        {selectedProfile && (
          <button id="change_address_btn" className="px-3 py-2" onClick={() => setSelectedProfile(undefined)}>
            Change
          </button>
        )}
      </div>
      {!selectedProfile && <ChangeDeliveryAddress />}
      {selectedProfile && <DeliveryAddress selectedProfile={selectedProfile} />}
    </div>
  );
};

export default DeliveryOption;
