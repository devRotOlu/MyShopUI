import { Dispatch, SetStateAction } from "react";

import { useMutation } from "@tanstack/react-query";
import { addDeliveryProfile } from "../helperFunctions/dataFetchFunctions";
import { deliveryDataType, useAddDeliveryProfileDataType } from "../types";

export const useAddDeliveryProfile = (setDeliveryProfiles: Dispatch<SetStateAction<deliveryDataType[]>>): useAddDeliveryProfileDataType => {
  const { mutate, isSuccess, submittedAt, isPending } = useMutation({
    mutationFn: addDeliveryProfile,
    onSuccess: (data) => {
      const _data = data?.data;
      setDeliveryProfiles((prevProfiles) => [...prevProfiles, _data]);
    },
  });

  return {
    addDeliveryProfile: mutate,
    addingDeliveryProfile: isPending,
    profileAdditionTime: submittedAt,
    profileAdded: isSuccess,
  };
};
