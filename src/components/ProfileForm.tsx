import React, { FormEvent } from "react";

import FormComp from "./formComp/FormComp.tsx";
import FormButton from "./formButton/FormButton.tsx";
import ComponentOverlay from "./ComponentOverlay.tsx.tsx";
import Loader from "./Loader.tsx";
import { ProfileFormProps } from "../types.ts";

const ProfileForm = ({ handleDeliveryProfile, isPending, children }: ProfileFormProps) => {
  const handleProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleDeliveryProfile();
  };

  return (
    <FormComp handleFormSubmit={handleProfile}>
      <div className="d-flex flex-wrap justify-content-between">{children}</div>
      <div className="position-relative">
        <FormButton value={isPending ? "" : "Continue"} styles={{ backgroundColor: isPending ? "black" : "var(--light_Green)", fontWeight: "bold", color: "black" }} />
        {isPending && (
          <ComponentOverlay>
            <div className="d-flex h-100 justify-content-center align-items-center">
              <Loader size="spinner-border-sm" color="white" />
            </div>
          </ComponentOverlay>
        )}
      </div>
    </FormComp>
  );
};

export default ProfileForm;
