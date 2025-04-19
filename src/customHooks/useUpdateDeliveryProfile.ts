import { Dispatch, SetStateAction } from "react";
import { useMutation } from "@tanstack/react-query";

import { updateDeliveryProfile } from "../helperFunctions/dataFetchFunctions";
import { deliveryDataType, useUpdateDeliveryProfileDataType } from "../types";

export const useUpdateDeliveryProfile = (setDeliveryProfiles: Dispatch<SetStateAction<deliveryDataType[]>>): useUpdateDeliveryProfileDataType => {
  const { mutate, isSuccess, submittedAt, isPending } = useMutation({
    mutationFn: updateDeliveryProfile,
    onSuccess: (data) => {
      var _data = data?.data;
      setDeliveryProfiles([..._data]);
    },
  });

  return {
    updateDeliveryProfile: mutate,
    updatingDeliveryProfile: isPending,
    profileUpdateTime: submittedAt,
    profileUpdated: isSuccess,
  };
};
