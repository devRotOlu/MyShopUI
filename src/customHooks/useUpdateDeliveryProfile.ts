import { useContext, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";

import { updateDeliveryProfile } from "../helperFunctions/dataFetchFunctions";
import { appContext } from "../components/context/AppContext";
import { useUpdateDeliveryProfileDataType } from "../types";

export const useUpdateDeliveryProfile = (): useUpdateDeliveryProfileDataType => {
  const { setDeliveryProfile } = useContext(appContext);

  const { mutate, data, isSuccess, submittedAt, isPending } = useMutation({
    mutationFn: updateDeliveryProfile,
  });

  const submittedAtRef = useRef(submittedAt);

  useEffect(() => {
    if (isSuccess && submittedAt !== submittedAtRef.current) {
      submittedAtRef.current = submittedAt;
      setDeliveryProfile((prevProfile) => ({ ...prevProfile, ...data?.data }));
    }
  }, [submittedAt, isSuccess, setDeliveryProfile, data]);

  return {
    updateDeliveryProfile: mutate,
    updatingDeliveryProfile: isPending,
  };
};
