import React, { useContext, useState } from "react";

import { checkoutContext } from "./Checkout";
import { deliveryContext } from "../context/DeliveryProfileProvider";

const DeliveryAddress = () => {
  const { deliveryProfiles } = useContext(deliveryContext);
  const { profileIndex } = useContext(checkoutContext);
  const { firstName, lastName, streetAddress, city, state, phoneNumber } = deliveryProfiles[profileIndex!];

  const [hasInstruction, setHasInstruction] = useState(false);

  return (
    <div className="pb-5 pt-4 bg-white" id="delivery_details">
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
        <input type="checkbox" onChange={() => setHasInstruction((preValue) => !preValue)} /> <span className="ms-1">Check this box if you have any instruction regarding this order</span>
      </label>
      {hasInstruction && <textarea className="w-100" placeholder="(If you want to add a comment e.g delivery instruction)"></textarea>}
    </div>
  );
};

export default DeliveryAddress;
