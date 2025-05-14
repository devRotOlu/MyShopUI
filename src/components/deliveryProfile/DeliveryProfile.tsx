import React, { ChangeEvent, useContext, useState } from "react";

import { checkoutContext } from "../checkout/Checkout";
import { deliveryContext } from "../context/DeliveryProfileProvider";
import "./style.css";

const DeliveryProfile = () => {
  const { deliveryProfiles } = useContext(deliveryContext);
  const { profileIndex, setOrderInstruction, orderInstruction } = useContext(checkoutContext);
  const { firstName, lastName, streetAddress, city, state, phoneNumber } = deliveryProfiles[profileIndex!];

  const [hasInstruction, setHasInstruction] = useState(false);

  const handleInstruction = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.currentTarget.value;
    setOrderInstruction(value);
  };

  return (
    <div className="pb-5 pt-4 bg-white" id="delivery_profile">
      <p className="fw-bold">
        {firstName} {lastName}
      </p>
      <div className="mt-3 mb-3">
        <p>
          {streetAddress}, <br /> {city}, {state}
        </p>
        <p>{phoneNumber}</p>
      </div>
      <label>
        <input id="add_delivery_info" type="checkbox" onChange={() => setHasInstruction((preValue) => !preValue)} /> <span className="ms-1">Check this box if you have any instruction regarding this order</span>
      </label>
      {hasInstruction && (
        <div className="mt-2">
          <p className="fw-bold">Delivery Instruction</p>
          <textarea onChange={handleInstruction} className="w-100 py-1 px-2" placeholder="(If you want to add a comment e.g delivery instruction)" value={orderInstruction}></textarea>
        </div>
      )}
    </div>
  );
};

export default DeliveryProfile;
