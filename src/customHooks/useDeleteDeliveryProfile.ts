import { Dispatch, SetStateAction, useRef } from "react";
import { useMutation } from "@tanstack/react-query";

import { deleteDeliveryProfile } from "../helperFunctions/dataFetchFunctions";
import { deliveryDataType, useDeleteDeliveryProfileDataType } from "../types";

export const useDeleteDeliveryProfile = (setDeliveryProfiles: Dispatch<SetStateAction<deliveryDataType[]>>): useDeleteDeliveryProfileDataType => {
  const profileIndexRef = useRef(-1);

  const handleProfileDeletion = (profileId: number, profileIndex: number) => {
    profileIndexRef.current = profileIndex;
    mutate(profileId);
  };

  const { mutate, isSuccess, submittedAt } = useMutation({
    mutationFn: deleteDeliveryProfile,
    onSuccess: () => {
      setDeliveryProfiles((prevData) => {
        return prevData.filter((_, index) => index !== profileIndexRef.current);
      });
    },
  });

  return {
    handleProfileDeletion,
    profileDeletionTime: submittedAt,
    profileDeleted: isSuccess,
  };
};
