import React, { ChangeEvent, FormEvent, useContext, useState } from "react";

import FormComp from "../formComp/FormComp";
import AccountTab from "../dashboard/AccountTab";
import PageWrapper from "../PageWrapper";
import TextInput from "../textInput/TextInput";
import FormButton from "../formButton/FormButton";
import ComponentOverlay from "../ComponentOverlay.tsx";
import Loader from "../Loader.tsx";

import { appContext } from "../context/AppContext";
import { profileDataType } from "../../types";
import { userProfileData } from "../../data";
import "./style.css";

const Profile = () => {
  const {
    loginData: { firstName, lastName, streetAddress, state, city },
    profileMutate,
    modifyingProfile,
  } = useContext(appContext);

  const [profile, setProfile] = useState<profileDataType>({
    firstName,
    lastName,
    streetAddress,
    state,
    city,
    currentPassword: undefined,
    newPassword: undefined,
  });

  console.log(profile, "profile");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const profileInputs = userProfileData.map(({ name, label }, index) => {
    let value = profile[name as keyof typeof profile];
    value = value ? value : "";
    if (name === "city" || name === "state") {
      return (
        <div className="input_wrapper">
          <TextInput key={index} name={name} type="text" value={value} handleChange={handleInputChange}>
            <p className="mb-1">{label}</p>
          </TextInput>
        </div>
      );
    }
    return (
      <TextInput key={index} name={name} type="text" value={value} handleChange={handleInputChange}>
        <p className="mb-1">{label}</p>
      </TextInput>
    );
  });

  const handleProfileSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    profileMutate(profile);
  };

  return (
    <PageWrapper pageId="profile">
      <div className="d-flex justify-content-center gap-4">
        <AccountTab />
        <div className="bg-white pt-3 pb-5 w-50 rounded">
          <div className="pb-2 border-bottom border-secondary px-4">
            <h2 className="fs-6">Account Information</h2>
          </div>
          <div className="px-4 pt-3">
            <FormComp handleFormSubmit={handleProfileSubmit}>
              <div className="d-flex  flex-wrap gap-4">{profileInputs}</div>
              <div className="mt-3 position-relative">
                <FormButton value={modifyingProfile ? "" : "Save Changes"} styles={{ backgroundColor: modifyingProfile ? "black" : "var(--light_Green)", fontWeight: "bold", color: "black" }} />
                {modifyingProfile && (
                  <ComponentOverlay>
                    <div className="d-flex h-100 justify-content-center align-items-center">
                      <Loader size="spinner-border-sm" color="white" />
                    </div>
                  </ComponentOverlay>
                )}
              </div>
            </FormComp>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Profile;
