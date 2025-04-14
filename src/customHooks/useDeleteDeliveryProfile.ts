import { useContext, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";

import { deleteDeliveryProfile } from "../helperFunctions/dataFetchFunctions";
import { useDeleteDeliveryProfileDataType } from "../types";
import { deliveryContext } from "../components/context/DeliveryProfileProvider";

export const useDeleteDeliveryProfile = (profileIndex: number): useDeleteDeliveryProfileDataType => {
  const { setDeliveryProfiles } = useContext(deliveryContext);

  const { mutate, isSuccess, submittedAt } = useMutation({ mutationFn: deleteDeliveryProfile });

  const submittedAtRef = useRef(submittedAt);

  useEffect(() => {
    if (isSuccess && submittedAt !== submittedAtRef.current) {
      submittedAtRef.current = submittedAt;
      setDeliveryProfiles((prevData) => {
        return prevData.filter((_, index) => index !== profileIndex);
      });
    }
  }, [isSuccess, profileIndex, setDeliveryProfiles, submittedAt]);

  const isDeleted = isSuccess && submittedAt !== submittedAtRef.current;

  return {
    deleteProfile: mutate,
    isDeleted,
  };
};
