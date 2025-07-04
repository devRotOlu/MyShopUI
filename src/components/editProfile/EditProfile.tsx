import React, { ChangeEvent, useContext, useState } from "react";

import TextInput from "../textInput/TextInput.tsx";
import ProfileForm from "../profileForm/ProfileForm.tsx";

import { deliveryProfileData } from "../../data.ts";
import { deliveryDataType, editProfileProps } from "../../types.ts";
import { deliveryContext } from "../context/DeliveryProfileProvider.tsx";
import "./style.css";

const EditProfile = ({ ...props }: editProfileProps) => {
  const { profileToEditIndex, updateDeliveryProfile, updatingDeliveryProfile, setPageIndex } = props;

  const { deliveryProfiles } = useContext(deliveryContext);

  const _deliveryProfile = deliveryProfiles[profileToEditIndex];

  const [deliveryProfile, setDeliveryProfile] = useState<deliveryDataType>(_deliveryProfile);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    setDeliveryProfile((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDeliveryProfile = () => {
    const _deliveryProfile = { ...deliveryProfile };
    _deliveryProfile.id = Number(_deliveryProfile.id);
    updateDeliveryProfile(_deliveryProfile);
  };

  const handlePageIndex = () => {
    setPageIndex("0");
  };

  const profileInputs = deliveryProfileData.map((data, index) => {
    const { name, label, placeholder } = data;
    let value = deliveryProfile[name as keyof typeof deliveryProfile];
    value = !value ? "" : `${value}`;
    if (name === "firstName" || name === "lastName") {
      return (
        <div className="name_input" key={index}>
          <TextInput name={name} type="text" value={value} handleChange={handleInputChange} placeholder={placeholder}>
            <p className="mb-2">{label}</p>
          </TextInput>
        </div>
      );
    }
    return (
      <div className="w-100">
        <TextInput key={index} name={name} type="text" value={value} handleChange={handleInputChange} placeholder={placeholder}>
          <p className="mb-2">{label}</p>
        </TextInput>
      </div>
    );
  });

  return (
    <div id="edit_profile">
      <ProfileForm handleDeliveryProfile={handleDeliveryProfile} isPending={updatingDeliveryProfile} legend="Edit Address" handlePageIndex={handlePageIndex}>
        {profileInputs}
      </ProfileForm>
    </div>
  );
};

export default EditProfile;
