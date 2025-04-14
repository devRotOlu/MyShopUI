import React, { ChangeEvent, useContext, useState } from "react";

import TextInput from "../textInput/TextInput";
import ProfileForm from "../ProfileForm.tsx";

import { deliveryProfileData } from "../../data";
import { deliveryDataType, EditProfileProps } from "../../types.ts";
import { deliveryContext } from "../context/DeliveryProfileProvider.tsx";

const EditProfile = ({ ...props }: EditProfileProps) => {
  const { profileToEditIndex, updateDeliveryProfile, updatingDeliveryProfile } = props;

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

  const profileInputs = deliveryProfileData.map((data, index) => {
    const { name, label, placeholder } = data;
    let value = deliveryProfile[name as keyof typeof deliveryProfile];
    value = !value ? "" : `${value}`;
    if (name === "firstName" || name === "lastName") {
      return (
        <div key={index} style={{ width: "47%" }}>
          <TextInput name={name} type="text" value={value} handleChange={handleInputChange} placeholder={placeholder}>
            <p className="mb-2">{label}</p>
          </TextInput>
        </div>
      );
    }
    return (
      <div className="w-100 mt-2">
        <TextInput key={index} name={name} type="text" value={value} handleChange={handleInputChange} placeholder={placeholder}>
          <p className="mb-2">{label}</p>
        </TextInput>
      </div>
    );
  });

  return (
    <div className="px-5 pt-3">
      <ProfileForm handleDeliveryProfile={handleDeliveryProfile} isPending={updatingDeliveryProfile}>
        {profileInputs}
      </ProfileForm>
    </div>
  );
};

export default EditProfile;
