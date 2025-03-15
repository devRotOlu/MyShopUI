import React, { useContext, useState } from "react";

import { appContext } from "../context/AppContext";

const DeliveryOption = () => {
  const appstates = useContext(appContext);
  const [hasInstruction, setHasInstruction] = useState(false);
  const {
    loginData: { firstName, lastName, shippingAddress, phoneNumber },
  } = appstates;
  return (
    <div className="bg-white">
      <div className="d-flex px-3 py-2 border-bottom justify-content-between">
        <h2>1. Choose Delivery Option</h2>
        <button>Change</button>
      </div>
      <div className="py-4 px-3">
        <p>
          {firstName} {lastName}
        </p>
        <p>{shippingAddress}</p>
        <p>{phoneNumber}</p>
        <label>
          <input type="checkbox" onChange={() => setHasInstruction((preValue) => !preValue)} />
          <span>Check this box if you have any instruction regarding this order</span>
        </label>
        {hasInstruction && <textarea className="w-100" placeholder="(If you want to add a comment e.g delivery instruction)"></textarea>}
      </div>
    </div>
  );
};

export default DeliveryOption;
