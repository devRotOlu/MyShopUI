import React, { ChangeEvent, FormEvent, useContext, useEffect, useRef, useState } from "react";

import FormComp from "../formComp/FormComp";
import PageWrapper from "../PageWrapper";
import TextInput from "../textInput/TextInput";
import FormButton from "../formButton/FormButton";
import ComponentOverlay from "../ComponentOverlay.tsx";
import Loader from "../Loader.tsx";
import BreadCrumb from "../breadCrumb/BreadCrumb.tsx";
import SkeletonPageLoader from "../SkeletonPageLoader.tsx";

import { userContext } from "../context/UserProvider.tsx";
import { profileDataType } from "../../types";
import { userProfileData } from "../../data";
import "./style.css";
import AccountTab from "../dashboard/AccountTab.tsx";
import { useCalHeightOnResize } from "../../customHooks/useCalHeightOnResize.ts";

const Profile = () => {
  const { loginData, profileMutate, modifyingProfile, isAuthenticating, isValidatingToken } = useContext(userContext);

  const formBtnRef = useRef<HTMLDivElement>(null!);

  useCalHeightOnResize(formBtnRef.current, "--profile-btn-wrap");

  const [profile, setProfile] = useState<profileDataType>({
    firstName: "",
    lastName: "",
    streetAddress: "",
    state: "",
    city: "",
    currentPassword: undefined,
    newPassword: undefined,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  useEffect(() => {
    const { firstName, lastName, streetAddress, state, city } = loginData;
    setProfile((prevProfile) => ({ ...prevProfile, firstName, lastName, streetAddress, state, city }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginData]);

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
      {(isValidatingToken || isAuthenticating) && (
        <div className="pt-3 px-5 h-100 w-100 bg-white flex-grow-1 ">
          <SkeletonPageLoader count={3} />
        </div>
      )}
      {!isAuthenticating && !isValidatingToken && (
        <>
          <div className="d-md-block d-none w-100">
            <BreadCrumb currentLinkLabel="Account Information" />
          </div>
          <div className="d-flex flex-sm-row flex-column justify-content-center gap-lg-4 gap-3 pb-sm-5 px-md-3 px-0">
            <AccountTab />
            <div className="bg-white pt-3 pb-5 rounded" id="page_content">
              <div className="pb-sm-2 pb-3 px-md-4 px-3 ">
                <h2 className="fs-6 text-muted">Account Information</h2>
              </div>
              <p className="d-sm-none d-block fw-bold">Edit Profile</p>
              <div className="px-md-4 pt-3 px-sm-3 px-4">
                <FormComp handleFormSubmit={handleProfileSubmit}>
                  <div className="d-flex flex-wrap gap-4">{profileInputs}</div>
                  <div className="mt-sm-3 px-sm-0 px-3 py-sm-0 py-2" id="form_btn_wrapper" ref={formBtnRef}>
                    <div className="position-relative">
                      <FormButton value={modifyingProfile ? "" : "Save Changes"} styles={{ backgroundColor: modifyingProfile ? "black" : "var(--light_Green)", fontWeight: "bold", color: "black" }} />
                      {modifyingProfile && (
                        <ComponentOverlay>
                          <div className="d-flex h-100 justify-content-center align-items-center">
                            <Loader size="spinner-border-sm" color="white" />
                          </div>
                        </ComponentOverlay>
                      )}
                    </div>
                  </div>
                </FormComp>
              </div>
            </div>
          </div>
        </>
      )}
    </PageWrapper>
  );
};

export default Profile;
