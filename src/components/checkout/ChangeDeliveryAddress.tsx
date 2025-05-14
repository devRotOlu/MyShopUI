import React, { useContext } from "react";

import { userContext } from "../context/UserProvider";
import { checkoutContext } from "./Checkout";

const ChangeDeliveryAddress = () => {
  const {
    loginData: { firstName },
  } = useContext(userContext);
  const { setShowModal } = useContext(checkoutContext);
  return (
    <div id="change_address" className="pt-4 pb-5">
      <div className="mt-3 d-flex justify-content-between">
        <div className="p-4 d-flex flex-column gap-4 bg-white">
          <p className="fw-bold">
            Hi {firstName},<br />
            Click on Add Address to specify a delivery address.
          </p>
          <button className="py-3 px-4 text-white" id="add_address_btn" onClick={() => setShowModal(true)}>
            Add Delivery Address
          </button>
        </div>
        <div className="p-4 pb-5 rounded">
          <p>
            Your item should be delivered to you in about 5<br /> working days within Lagos & Abuja,
            <br /> and 7 to 14 days outside Lagos & Abuja.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangeDeliveryAddress;
