import React, { useState } from "react";

import ProfileForm from "../profileForm/ProfileForm";
import AddProfileFormElements from "../addProfileFormElements/AddProfileFormElements";

import { addProfileProps, deliveryDataType } from "../../types";
import "./style.css";

const AddProfile = ({ addDeliveryProfile, addingDeliveryProfile, setPageIndex }: addProfileProps) => {
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
      <ProfileForm handleDeliveryProfile={handleDeliveryProfile} isPending={addingDeliveryProfile} legend="Add New Address" handlePageIndex={handlePageIndex}>
        <AddProfileFormElements setDeliveryProfile={setDeliveryProfile} />
      </ProfileForm>
    </div>
  );
};

export default AddProfile;
