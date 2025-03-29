import { useContext, useEffect, useRef } from "react";

import { appContext } from "../components/context/AppContext";
import { useMutation } from "@tanstack/react-query";
import { addDeliveryProfile } from "../helperFunctions/dataFetchFunctions";
import { useAddDeliveryProfileDataType } from "../types";

export const useAddDeliveryProfile = (navigateFunc?: () => void): useAddDeliveryProfileDataType => {
  const { setDeliveryProfiles } = useContext(appContext);

  const { mutate, data, isSuccess, submittedAt, isPending } = useMutation({
    mutationFn: addDeliveryProfile,
  });

  const submittedAtRef = useRef(submittedAt);

  useEffect(() => {
    if (isSuccess && submittedAt !== submittedAtRef.current) {
      submittedAtRef.current = submittedAt;
      const _data = data?.data;
      setDeliveryProfiles((prevProfiles) => [...prevProfiles, _data]);
      if (navigateFunc) navigateFunc();
    }
  }, [submittedAt, isSuccess, setDeliveryProfiles, data, navigateFunc]);

  const isAdded = isSuccess && submittedAt !== submittedAtRef.current;

  return {
    addDeliveryProfile: mutate,
    addingDeliveryProfile: isPending,
    isAdded,
  };
};
