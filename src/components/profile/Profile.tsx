import React, { ChangeEvent, FormEvent, useContext, useEffect, useRef, useState } from "react";

import FormComp from "../formComp/FormComp";
import PageWrapper from "../PageWrapper";
import TextInput from "../textInput/TextInput";
import FormButton from "../formButton/FormButton";
import ComponentOverlay from "../ComponentOverlay.tsx";
import Loader from "../Loader.tsx";
import AccountBreadCrumb from "../accountBreadCrumb/AccountBreadCrumb.tsx";
import SkeletonPageLoader from "../SkeletonPageLoader.tsx";
import ValidationError from "../validationError/ValidationError.tsx";
import AccountTab from "../dashboard/AccountTab.tsx";
import SEOEnhanzer from "../../SEOEnhanzer.tsx";

import { userContext } from "../context/UserProvider.tsx";
import { profileDataType } from "../../types/types.ts";
import { userProfileData } from "../../data";
import "./style.css";
import { useCalHeightOnResize } from "../../customHooks/useCalHeightOnResize.ts";
import { useValidation } from "../../customHooks/useValidation.ts";
import { profileSchema } from "../../formSchemas.ts";

const Profile = () => {
  const { loginData, profileMutate, modifyingProfile, isAuthenticating, isValidatingToken } = useContext(userContext);

  const formBtnRef = useRef<HTMLDivElement>(null!);

  useCalHeightOnResize(formBtnRef, "--profile-btn-wrap");
  const { testValidation, validationErrors } = useValidation(profileSchema);

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
    const error = validationErrors[name as keyof typeof validationErrors];
    if (name === "city" || name === "state") {
      return (
        <div className="input_wrapper">
          <TextInput key={index} name={name} type="text" value={value} handleChange={handleInputChange}>
            <p className="mb-1">{label}</p>
          </TextInput>
          {error !== undefined && <ValidationError error={error} />}
        </div>
      );
    }
    return (
      <div className="w-100">
        <TextInput key={index} name={name} type="text" value={value} handleChange={handleInputChange}>
          <p className="mb-1">{label}</p>
        </TextInput>
        {error !== undefined && <ValidationError error={error} />}
      </div>
    );
  });

  const handleProfileSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValidated = testValidation(profile);
    if (isValidated) profileMutate(profile);
  };

  return (
    <>
      <SEOEnhanzer title="Account Information | MyShop Online Shopping" description="View and update your account information and preferences" robots="noindex, nofollow" />
      <PageWrapper pageId="profile">
        {(isValidatingToken || isAuthenticating) && (
          <div className="pt-3 px-5 h-100 w-100 bg-white flex-grow-1 ">
            <SkeletonPageLoader count={3} />
          </div>
        )}
        {!isAuthenticating && !isValidatingToken && (
          <>
            <div className="d-md-block d-none w-100">
              <AccountBreadCrumb currentLinkLabel="Account Information" route="/account/profile" />
            </div>
            <div className="d-flex flex-sm-row flex-column justify-content-center gap-lg-4 gap-3 pb-sm-5 px-md-3 px-0">
              <AccountTab />
              <div className="bg-white pt-3 pb-5 rounded" id="page_content">
                <div className="pb-sm-2 pb-3 px-md-4 px-3 ">
                  <h3 className="fs-6 text-muted">Account Information</h3>
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
    </>
  );
};

export default Profile;
