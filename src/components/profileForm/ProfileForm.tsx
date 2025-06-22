import React, { FormEvent } from "react";

import FormComp from "../formComp/FormComp.tsx";
import FormButton from "../formButton/FormButton.tsx";
import ComponentOverlay from "../ComponentOverlay.tsx.tsx";
import Loader from "../Loader.tsx";

import { ProfileFormProps } from "../../types.ts";
import "./style.css";

const ProfileForm = ({ handleDeliveryProfile, isPending, children, legend, handlePageIndex }: ProfileFormProps) => {
  const handleProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleDeliveryProfile();
  };

  return (
    <div className="px-md-5 px-3  pt-3" id="profile_form">
      <FormComp handleFormSubmit={handleProfile}>
        <fieldset>
          <legend className="d-sm-none d-block fw-bold border-bottom pb-2 text-center mb-3 px-5" style={{ fontSize: "14px" }}>
            {legend}
          </legend>
          <div className="d-flex flex-wrap justify-content-between gap-2">{children}</div>
          <div className="position-relative mt-4">
            <FormButton value={isPending ? "" : "Continue"} styles={{ backgroundColor: isPending ? "black" : "var(--light_Green)", fontWeight: "bold", color: "black" }} />
            {isPending && (
              <ComponentOverlay>
                <div className="d-flex h-100 justify-content-center align-items-center">
                  <Loader size="spinner-border-sm" color="white" />
                </div>
              </ComponentOverlay>
            )}
          </div>
          <button className="d-sm-none d-block mt-2 text-center w-100" id="cancel_btn" onClick={() => handlePageIndex()}>
            Cancel
          </button>
        </fieldset>
      </FormComp>
    </div>
  );
};

export default ProfileForm;
