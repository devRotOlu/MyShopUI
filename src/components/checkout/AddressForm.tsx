import React, { useContext } from "react";

import AddProfile from "../AddProfile";
import ModalCloseButton from "../ModalCloseButton";

import { checkoutContext } from "./Checkout";
import { addressFormProps, deliveryDataType } from "../../types";

const AddressForm = ({ setAddAddress }: addressFormProps) => {
  const { setShowModal, addDeliveryProfile, addingDeliveryProfile, isAddedAddress } = useContext(checkoutContext);

  const handleDeliveryProfile = (deliveryProfile: deliveryDataType) => {
    addDeliveryProfile(deliveryProfile);
  };

  if (isAddedAddress) setAddAddress(false);

  return (
    <div className="h-100 d-flex flex-column" id="add_address">
      <div className="d-flex justify-content-between py-3 w-100 align-items-center px-3 w-100">
        <h2 className="fs-6">AddressBook</h2>
        <ModalCloseButton setShowModal={setShowModal} />
      </div>
      <div className="flex-grow-1 px-3 pt-3 pb-4">
        <AddProfile addDeliveryProfile={handleDeliveryProfile} addingDeliveryProfile={addingDeliveryProfile} />
        <button onClick={() => setAddAddress(false)} className="mt-2 w-100 py-2">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddressForm;
