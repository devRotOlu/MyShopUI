import { useEffect, useRef, useState, useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getTransactionStatus, getTranserInfo, initializePayment, sendCardDetails } from "../helperFunctions/dataFetchFunctions";
import { bankDetailsType, useMonnifyType } from "../types";
import { userContext } from "../components/context/UserProvider";

export const useMonnify = (bankCode: string): useMonnifyType => {
  const {
    loginData: { email },
  } = useContext(userContext);

  const queryClient = useQueryClient();

  const {
    mutate: _sendCardDetails,
    isSuccess: cardDetailsSent,
    isPending: sendingCardDetails,
    isError: isCardPaymentError,
    data: cardPaymentData,
  } = useMutation({
    mutationFn: sendCardDetails,
  });

  const {
    data: paymentData,
    isFetching: isInitializingPayment,
    refetch: _initializePayment,
    isError: isMonnifyInitializationError,
  } = useQuery({
    queryFn: () => initializePayment(email),
    queryKey: ["checkout", "initialize_payment"],
    enabled: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
    retryOnMount: false,
  });

  const transactionRef: string = paymentData?.data?.transactionReference;

  const {
    data: transferDetails,
    refetch: sendTransferDetails,
    isSuccess: detailsSent,
    isFetching: isFetchingTransferDetails,
    isError: isBankTransferError,
  } = useQuery({
    queryKey: ["checkout", "bank_transfer"],
    enabled: false,
    queryFn: () => getTranserInfo(bankCode, transactionRef),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
    retryOnMount: false,
  });

  const {
    mutate: refetchTransactionStatus,
    data: transactionData,
    isPending: isFetchingTransactionStatus,
    isSuccess: transactionSuccessful,
    isError: isPaymentError,
  } = useMutation({
    mutationFn: getTransactionStatus,
  });

  const isLoadedStatusRef = useRef(false);
  const isLoadedDetailsRef = useRef(false);
  const isSentCardDetailsRef = useRef(false);

  useEffect(() => {
    if (isFetchingTransactionStatus) {
      isLoadedStatusRef.current = true;
    }
  }, [isFetchingTransactionStatus]);

  useEffect(() => {
    if (sendingCardDetails) {
      isSentCardDetailsRef.current = true;
    }
  }, [sendingCardDetails]);

  useEffect(() => {
    if (isFetchingTransferDetails) {
      isLoadedDetailsRef.current = true;
    }
  }, [isFetchingTransferDetails]);

  const bankDetails: bankDetailsType = transferDetails?.data?.responseBody;

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ["checkout"] });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const orderId = cardDetailsSent ? cardPaymentData?.data?.orderId : transactionData?.data?.orderId;

  return {
    isInitializingPayment,
    isMonnifyInitializationError,
    orderId,
    sendingCardDetails,
    isBankTransferError,
    isPaymentError,
    isFetchingTransferDetails,
    sendCardDetails: _sendCardDetails,
    cardDetailsSent,
    isCardPaymentError,
    initializePayment: _initializePayment,
    transactionRef,
    sendTransferDetails,
    detailsSent,
    refetchTransactionStatus,
    isFetchingTransactionStatus,
    isTransactionSuccessful: transactionSuccessful,
    isLoadedStatus: isLoadedStatusRef.current,
    isLoadedDetails: isLoadedDetailsRef.current,
    isSentCardDetails: isSentCardDetailsRef.current,
    bankDetails,
  };
};
