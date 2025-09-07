import React, { FormEvent, useContext, useState } from "react";

import ModalCloseButton from "../ModalCloseButton";
import AddProfileFormElements from "../addProfileFormElements/AddProfileFormElements";
import FormComp from "../formComp/FormComp";
import ComponentOverlay from "../ComponentOverlay.tsx";
import Loader from "../Loader";
import FormButton from "../formButton/FormButton";

import { checkoutContext } from "../checkout/Checkout";
import { addressFormProps, deliveryDataType } from "../../types/types.ts";
import { deliveryContext } from "../context/DeliveryProfileProvider";
import { deliveryAddressSchema } from "../../formSchemas.ts";
import { useValidation } from "../../customHooks/useValidation.ts";
import "./style.css";

const AddressForm = ({ setAddAddress }: addressFormProps) => {
  const { testValidation, validationErrors } = useValidation(deliveryAddressSchema);
  const [deliveryProfile, setDeliveryProfile] = useState<deliveryDataType>({
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "",
    phoneNumber: "",
    lga: "",
    directions: "",
  });
  const { setShowModal } = useContext(checkoutContext);
  const { addDeliveryProfile, addingDeliveryProfile, isAddedAddress } = useContext(deliveryContext);

  if (isAddedAddress) setAddAddress(false);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = testValidation(deliveryProfile);
    if (isValid) addDeliveryProfile(deliveryProfile);
  };

  return (
    <div className="h-100 d-flex flex-column" id="add_address">
      <div className="d-flex justify-content-between py-3 w-100 align-items-center px-3 w-100">
        <h2 className="fs-6">AddressBook</h2>
        <ModalCloseButton setShowModal={setShowModal} />
      </div>
      <div className="flex-grow-1 px-3 pt-3 pb-4">
        <FormComp handleFormSubmit={handleFormSubmit}>
          <div className="d-flex flex-wrap justify-content-between gap-2">
            <AddProfileFormElements setDeliveryProfile={setDeliveryProfile} validationErrors={validationErrors} />
          </div>
          <div className="position-relative mt-4">
            <FormButton value={addingDeliveryProfile ? "" : "Continue"} styles={{ backgroundColor: addingDeliveryProfile ? "black" : "var(--light_Green)", fontWeight: "bold", color: "black" }} />
            {addingDeliveryProfile && (
              <ComponentOverlay>
                <div className="d-flex h-100 justify-content-center align-items-center">
                  <Loader size="spinner-border-sm" color="white" />
                </div>
              </ComponentOverlay>
            )}
          </div>
        </FormComp>
        <button onClick={() => setAddAddress(false)} className="mt-2 w-100 py-2">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddressForm;
