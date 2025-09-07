import { useEffect, useContext, useRef } from "react";
import { useQuery } from "@tanstack/react-query";

import { useGetDeliveryProfileDataType } from "../types/types";
import { getDeliveryProfile } from "../helperFunctions/dataFetchFunctions";
import { userContext } from "../components/context/UserProvider";
import { deliveryContext } from "../components/context/DeliveryProfileProvider";

export const useGetDeliveryProfile = (): useGetDeliveryProfileDataType => {
  const {
    loginData: { id: customerId },
  } = useContext(userContext);
  const { setDeliveryProfiles } = useContext(deliveryContext);
  const {
    data,
    dataUpdatedAt,
    isLoading: loadingDeliveryProfile,
    isSuccess,
  } = useQuery({
    queryKey: ["delivery_profile"],
    queryFn: () => getDeliveryProfile(customerId),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const dataUpdatedAtRef = useRef(dataUpdatedAt);

  useEffect(() => {
    const isUpdated = dataUpdatedAt !== dataUpdatedAtRef.current;
    if (isUpdated) {
      dataUpdatedAtRef.current = dataUpdatedAt;
      const _data = data?.data;
      if (_data) {
        setDeliveryProfiles([..._data]);
      }
    }
  }, [data?.data, dataUpdatedAt, isSuccess, setDeliveryProfiles]);

  return {
    loadingDeliveryProfile,
  };
};
