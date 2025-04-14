import React, { ChangeEvent, useState } from "react";

import TextInput from "./textInput/TextInput";
import ProfileForm from "./ProfileForm";

import { deliveryProfileData } from "../data";
import { AddProfileProps, deliveryDataType } from "../types";

const AddProfile = ({ addDeliveryProfile, addingDeliveryProfile }: AddProfileProps) => {
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

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    setDeliveryProfile((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDeliveryProfile = () => {
    addDeliveryProfile(deliveryProfile);
  };

  const profileInputs = deliveryProfileData.map((data, index) => {
    const { name, label, placeholder } = data;
    if (name === "firstName" || name === "lastName") {
      return (
        <div key={index} style={{ width: "47%" }}>
          <TextInput name={name} type="text" handleChange={handleInputChange} placeholder={placeholder}>
            <p className="mb-2">{label}</p>
          </TextInput>
        </div>
      );
    }
    return (
      <div className="w-100 mt-2">
        <TextInput key={index} name={name} type="text" handleChange={handleInputChange} placeholder={placeholder}>
          <p className="mb-2">{label}</p>
        </TextInput>
      </div>
    );
  });

  return (
    <ProfileForm handleDeliveryProfile={handleDeliveryProfile} isPending={addingDeliveryProfile}>
      {profileInputs}
    </ProfileForm>
  );
};

export default AddProfile;
