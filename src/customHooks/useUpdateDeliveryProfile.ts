import { useContext, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";

import { updateDeliveryProfile } from "../helperFunctions/dataFetchFunctions";
import { useUpdateDeliveryProfileDataType } from "../types";
import { deliveryContext } from "../components/context/DeliveryProfileProvider";

export const useUpdateDeliveryProfile = (navigateFunc?: () => void): useUpdateDeliveryProfileDataType => {
  const { setDeliveryProfiles } = useContext(deliveryContext);

  const { mutate, data, isSuccess, submittedAt, isPending } = useMutation({
    mutationFn: updateDeliveryProfile,
  });

  const submittedAtRef = useRef(submittedAt);

  useEffect(() => {
    if (isSuccess && submittedAt !== submittedAtRef.current) {
      submittedAtRef.current = submittedAt;
      var _data = data?.data;
      setDeliveryProfiles([..._data]);
      if (navigateFunc) navigateFunc();
    }
  }, [submittedAt, isSuccess, setDeliveryProfiles, data, navigateFunc]);

  const isUpdated = isSuccess && submittedAt !== submittedAtRef.current;

  return {
    updateDeliveryProfile: mutate,
    updatingDeliveryProfile: isPending,
    isUpdated,
  };
};
