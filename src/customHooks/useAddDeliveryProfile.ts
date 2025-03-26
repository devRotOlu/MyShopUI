import { useContext, useEffect, useRef } from "react";

import { appContext } from "../components/context/AppContext";
import { useMutation } from "@tanstack/react-query";
import { addDeliveryProfile } from "../helperFunctions/dataFetchFunctions";
import { useAddDeliveryProfileDataType } from "../types";

export const useAddDeliveryProfile = (): useAddDeliveryProfileDataType => {
  const { setDeliveryProfile } = useContext(appContext);

  const { mutate, data, isSuccess, submittedAt, isPending } = useMutation({
    mutationFn: addDeliveryProfile,
  });

  const submittedAtRef = useRef(submittedAt);

  useEffect(() => {
    if (isSuccess && submittedAt !== submittedAtRef.current) {
      submittedAtRef.current = submittedAt;
      setDeliveryProfile((prevProfile) => ({ ...prevProfile, ...data?.data }));
    }
  }, [submittedAt, isSuccess, setDeliveryProfile, data]);

  return {
    addDeliveryProfile: mutate,
    addingDeliveryProfile: isPending,
  };
};
