import React, { useState } from "react";

import ProfileForm from "../profileForm/ProfileForm";
import AddProfileFormElements from "../addProfileFormElements/AddProfileFormElements";

import { addProfileProps, deliveryDataType } from "../../types/types";
import { useValidation } from "../../customHooks/useValidation";
import { deliveryAddressSchema } from "../../formSchemas";
import "./style.css";

const AddProfile = ({ addDeliveryProfile, addingDeliveryProfile, setPageIndex }: addProfileProps) => {
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

  const handleDeliveryProfile = () => {
    addDeliveryProfile(deliveryProfile);
  };

  const handlePageIndex = () => {
    setPageIndex("0");
  };

  return (
    <div id="add_profile">
      <ProfileForm props={{ handleDeliveryProfile, isPending: addingDeliveryProfile, legend: "Add New Address", handlePageIndex, testValidation, deliveryProfile }}>
        <AddProfileFormElements setDeliveryProfile={setDeliveryProfile} validationErrors={validationErrors} />
      </ProfileForm>
    </div>
  );
};

export default AddProfile;
