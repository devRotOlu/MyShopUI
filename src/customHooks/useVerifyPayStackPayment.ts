import { useQuery } from "@tanstack/react-query";
import { reactLocalStorage } from "reactjs-localstorage";

import { verifyPayStackPayment } from "../helperFunctions/dataFetchFunctions";
import { deliveryDataType, useVerifyPayStackPaymentDataType } from "../types/types";

export const useVerifyPayStackPayment = (payStackReference: string, deliveryProfiles: deliveryDataType[]): useVerifyPayStackPaymentDataType => {
  const { isSuccess, refetch, isError, data } = useQuery({
    queryKey: ["verify_paystack_payment"],
    queryFn: () => {
      const profileIndex = Number(reactLocalStorage.get("profileIndex", true));
      const deliveryProfile = deliveryProfiles[profileIndex];
      const profileId = Number(deliveryProfile.id);
      const orderInstruction = reactLocalStorage.get("orderInstruction", undefined, true);
      if (orderInstruction) {
        reactLocalStorage.remove("orderInstruction");
      }
      return verifyPayStackPayment({
        reference: payStackReference,
        profileId,
        orderInstruction,
      });
    },
    refetchInterval: false,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: false,
  });

  return {
    isPaystackPaymentSuccess: isSuccess,
    isPaystackPaymentError: isError,
    verifyPayStackPayment: refetch,
    orderId: data?.data?.orderId,
  };
};
