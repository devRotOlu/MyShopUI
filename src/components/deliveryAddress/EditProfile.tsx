import React, { ChangeEvent, FormEvent, useContext } from "react";
import { Icon } from "@iconify/react";

import FormComp from "../formComp/FormComp";
import TextInput from "../textInput/TextInput";
import Loader from "../Loader";
import FormButton from "../formButton/FormButton";
import ComponentOverlay from "../ComponentOverlay.tsx";

import { appContext } from "../context/AppContext";
import { editProfileProps } from "../../types";
import { deliveryProfileData } from "../../data";
import { useAddDeliveryProfile } from "../../customHooks/useAddDeliveryProfile";
import { useUpdateDeliveryProfile } from "../../customHooks/useUpdateDeliveryProfile";

const EditProfile = ({ setHideProfileEdit, isEmptyProfile }: editProfileProps) => {
  const { deliveryProfile, setDeliveryProfile } = useContext(appContext);

  const { addDeliveryProfile, addingDeliveryProfile } = useAddDeliveryProfile();
  const { updateDeliveryProfile, updatingDeliveryProfile } = useUpdateDeliveryProfile();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    setDeliveryProfile((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleProfileEdit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEmptyProfile) {
      addDeliveryProfile(deliveryProfile);
    } else {
      updateDeliveryProfile(deliveryProfile);
    }
  };

  const profileInputs = deliveryProfileData.map((data, index) => {
    const { name, label, placeholder } = data;
    let value = deliveryProfile[name as keyof typeof deliveryProfile];
    value = !value ? "" : value;
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
    <div className="pt-3 pb-5">
      <div className="d-flex gap-2 align-items-center border-bottom pb-2 px-3">
        <button onClick={() => setHideProfileEdit(true)}>
          <Icon icon="eva:arrow-back-fill" fontSize="16px" />
        </button>
        <h2 className="fs-6">
          Add Delivery <br />
          Address
        </h2>
      </div>
      <div className="px-5 pt-3">
        <FormComp handleFormSubmit={handleProfileEdit}>
          <div className="d-flex flex-wrap justify-content-between">{profileInputs}</div>
          <div className="position-relative">
            <FormButton value="Continue" styles={{ backgroundColor: updatingDeliveryProfile || addingDeliveryProfile ? "black" : "var(--light_Green)", fontWeight: "bold", color: "black" }} isPending={addingDeliveryProfile || updatingDeliveryProfile} />
            {updatingDeliveryProfile ||
              (addingDeliveryProfile && (
                <ComponentOverlay>
                  <div className="d-flex h-100 justify-content-center align-items-center">
                    <Loader size="spinner-border-sm" color="white" />
                  </div>
                </ComponentOverlay>
              ))}
          </div>
        </FormComp>
      </div>
    </div>
  );
};

export default EditProfile;
