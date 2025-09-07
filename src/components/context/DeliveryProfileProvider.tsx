import React, { useContext, useEffect, useRef, useState } from "react";

import { deliveryContextType, deliveryDataType, ProvidersProp } from "../../types/types";
import { useAddDeliveryProfile } from "../../customHooks/useAddDeliveryProfile";
import Alert from "../alert/Alert";
import { alertContext } from "./AlertProvider";
import { useUpdateDeliveryProfile } from "../../customHooks/useUpdateDeliveryProfile";
import { useDeleteDeliveryProfile } from "../../customHooks/useDeleteDeliveryProfile";

export const deliveryContext = React.createContext({} as deliveryContextType);

const DeliveryProfileProvider = ({ children }: ProvidersProp) => {
  const [deliveryProfiles, setDeliveryProfiles] = useState<deliveryDataType[]>([]);
  const { addDeliveryProfile, addingDeliveryProfile, profileAdded, profileAdditionTime } = useAddDeliveryProfile(setDeliveryProfiles);
  const { updateDeliveryProfile, updatingDeliveryProfile, profileUpdateTime, profileUpdated } = useUpdateDeliveryProfile(setDeliveryProfiles);
  const { handleProfileDeletion, profileDeleted, profileDeletionTime } = useDeleteDeliveryProfile(setDeliveryProfiles);

  const { handleAlert } = useContext(alertContext);

  const profileAdditionTimeRef = useRef(profileAdditionTime);
  const profileUpdateTimeRef = useRef(profileUpdateTime);
  const profileDeletionTimeRef = useRef(profileDeletionTime);

  const isAddedAddress = profileAdded && profileAdditionTime !== profileAdditionTimeRef.current;
  const isUpdatedAddress = profileUpdated && profileUpdateTimeRef.current !== profileUpdateTime;
  const isDeletedAddress = profileDeleted && profileDeletionTimeRef.current !== profileDeletionTime;

  useEffect(() => {
    if (isDeletedAddress) {
      profileDeletionTimeRef.current = profileDeletionTime;
      const alertDialog = <Alert alertMessage="Address successfully deleted!" styles={{ backgroundColor: "var(--light_Green)", height: "60px " }} />;
      handleAlert({
        showAlert: true,
        alertDialog,
      });
    }
  }, [handleAlert, isDeletedAddress, profileDeletionTime]);

  useEffect(() => {
    if (isUpdatedAddress) {
      profileUpdateTimeRef.current = profileUpdateTime;
      const alertDialog = <Alert alertMessage="Delivery Address updated successfully" styles={{ backgroundColor: "var(--light_Green)", height: "60px " }} />;
      handleAlert({
        showAlert: true,
        alertDialog,
      });
    }
  }, [handleAlert, isUpdatedAddress, profileUpdateTime, profileUpdated]);

  useEffect(() => {
    if (isAddedAddress) {
      profileAdditionTimeRef.current = profileAdditionTime;
      const alertDialog = <Alert alertMessage="New Delivery Address saved successfully!" styles={{ backgroundColor: "var(--light_Green)", height: "60px " }} />;
      handleAlert({
        showAlert: true,
        alertDialog,
      });
    }
  }, [handleAlert, isAddedAddress, profileAdded, profileAdditionTime]);

  return (
    <deliveryContext.Provider
      value={{
        isDeletedAddress,
        handleProfileDeletion,
        isUpdatedAddress,
        updatingDeliveryProfile,
        isAddedAddress,
        deliveryProfiles,
        setDeliveryProfiles,
        addDeliveryProfile,
        addingDeliveryProfile,
        updateDeliveryProfile,
      }}
    >
      {children}
    </deliveryContext.Provider>
  );
};

export default DeliveryProfileProvider;
