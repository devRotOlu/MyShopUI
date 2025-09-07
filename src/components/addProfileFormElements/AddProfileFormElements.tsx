import React, { ChangeEvent } from "react";

import TextInput from "../textInput/TextInput";
import ValidationError from "../validationError/ValidationError";

import { deliveryProfileData } from "../../data";
import { addProfileFormElementProps } from "../../types/types";
import "./style.css";

const AddProfileFormElements = ({ setDeliveryProfile, validationErrors }: addProfileFormElementProps) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    setDeliveryProfile((prevData) => ({ ...prevData, [name]: value }));
  };
  const profileInputs = deliveryProfileData.map((data, index) => {
    const { name, label, placeholder } = data;
    const error = validationErrors[name as keyof typeof validationErrors];
    if (name === "firstName" || name === "lastName") {
      return (
        <div key={index} className="name_input">
          <TextInput name={name} type="text" handleChange={handleInputChange} placeholder={placeholder}>
            <p className="mb-2">{label}</p>
          </TextInput>
          {error !== undefined && <ValidationError error={error} />}
        </div>
      );
    }
    return (
      <div className="w-100 mt-2">
        <TextInput key={index} name={name} type="text" handleChange={handleInputChange} placeholder={placeholder}>
          <p className="mb-2">{label}</p>
        </TextInput>
        {error !== undefined && <ValidationError error={error} />}
      </div>
    );
  });
  return <>{profileInputs}</>;
};

export default AddProfileFormElements;
