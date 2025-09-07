import React, { ChangeEvent, useContext, useState } from "react";

import TextInput from "../textInput/TextInput.tsx";
import ProfileForm from "../profileForm/ProfileForm.tsx";
import ValidationError from "../validationError/ValidationError.tsx";

import { deliveryProfileData } from "../../data.ts";
import { deliveryDataType, editProfileProps } from "../../types/types.ts";
import { deliveryContext } from "../context/DeliveryProfileProvider.tsx";
import { useValidation } from "../../customHooks/useValidation.ts";
import "./style.css";
import { deliveryAddressSchema } from "../../formSchemas.ts";

const EditProfile = ({ ...props }: editProfileProps) => {
  const { profileToEditIndex, updateDeliveryProfile, updatingDeliveryProfile, setPageIndex } = props;

  const { deliveryProfiles } = useContext(deliveryContext);

  const _deliveryProfile = deliveryProfiles[profileToEditIndex];

  const [deliveryProfile, setDeliveryProfile] = useState<deliveryDataType>(_deliveryProfile);

  const { testValidation, validationErrors } = useValidation(deliveryAddressSchema);

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
    const error = validationErrors[name as keyof typeof validationErrors];
    value = !value ? "" : `${value}`;
    if (name === "firstName" || name === "lastName") {
      return (
        <div className="name_input" key={index}>
          <TextInput name={name} type="text" value={value} handleChange={handleInputChange} placeholder={placeholder}>
            <p className="mb-2">{label}</p>
          </TextInput>
          {error !== undefined && <ValidationError error={error} />}
        </div>
      );
    }
    return (
      <div className="w-100">
        <TextInput key={index} name={name} type="text" value={value} handleChange={handleInputChange} placeholder={placeholder}>
          <p className="mb-2">{label}</p>
        </TextInput>
        {error !== undefined && <ValidationError error={error} />}
      </div>
    );
  });

  return (
    <div id="edit_profile">
      <ProfileForm props={{ handleDeliveryProfile, isPending: updatingDeliveryProfile, legend: "Edit Address", handlePageIndex, testValidation, deliveryProfile }}>{profileInputs}</ProfileForm>
    </div>
  );
};

export default EditProfile;
