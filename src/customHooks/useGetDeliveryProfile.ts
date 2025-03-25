import { useEffect, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { useGetDeliveryProfileDataType } from "../types";
import { getDeliveryProfile } from "../helperFunctions/dataFetchFunctions";
import { appContext } from "../components/context/AppContext";

export const useGetDeliveryProfile = (): useGetDeliveryProfileDataType => {
  const {
    loginData: { id: customerId },
    setDeliveryProfile,
  } = useContext(appContext);
  const {
    data,
    dataUpdatedAt,
    isLoading: loadingDeliveryProfile,
    isSuccess,
  } = useQuery({
    queryKey: ["delivery_profile"],
    queryFn: () => getDeliveryProfile(customerId),
  });

  // const dataUpdatedAtRef = useRef(dataUpdatedAt);

  useEffect(() => {
    // const isUpdated = dataUpdatedAt !== dataUpdatedAtRef.current;
    if (isSuccess) {
      console.log("in here");
      const _data = data?.data;
      if (_data) {
        setDeliveryProfile({ ..._data });
      }
    }
  }, [data?.data, isSuccess, setDeliveryProfile]);

  return {
    loadingDeliveryProfile,
  };
};
