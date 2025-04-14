import { useEffect, useRef, useState, useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getTransactionStatus, getTranserInfo, initializePayment, sendCardDetails } from "../helperFunctions/dataFetchFunctions";
import { bankDetailsType, useMonnifyType } from "../types";
import { userContext } from "../components/context/UserProvider";

export const useMonnify = (): useMonnifyType => {
  const {
    loginData: { email },
  } = useContext(userContext);
  const [bankCode, setBankCode] = useState<string>("");

  const queryClient = useQueryClient();

  const {
    mutate: _sendCardDetails,
    isSuccess: cardDetailsSent,
    isPending: sendingCardDetails,
    isError: isCardPaymentError,
  } = useMutation({
    mutationFn: sendCardDetails,
  });

  const {
    data: paymentData,
    isFetching: isInitializingPayment,
    isSuccess: paymentInitialized,
    refetch: _initializePayment,
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
    refetch: refetchTransactionStatus,
    isFetched: isFetchedTransactionStatus,
    data: transactionData,
    isFetching: isFetchingTransactionStatus,
    isSuccess: transactionSuccessful,
    isError: isPaymentError,
  } = useQuery({
    queryKey: ["checkout", "transaction_status"],
    queryFn: () => getTransactionStatus(transactionRef),
    enabled: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
    retryOnMount: false,
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

  return {
    isBankTransferError,
    isPaymentError,
    isFetchingTransferDetails,
    sendCardDetails: _sendCardDetails,
    cardDetailsSent,
    isCardPaymentError,
    isInitializingPayment,
    paymentInitialized,
    initializePayment: _initializePayment,
    transactionRef,
    sendTransferDetails,
    detailsSent,
    refetchTransactionStatus,
    isFetchedTransactionStatus,
    isFetchingTransactionStatus,
    isTransactionSuccessful: transactionSuccessful,
    isLoadedStatus: isLoadedStatusRef.current,
    isLoadedDetails: isLoadedDetailsRef.current,
    isSentCardDetails: isSentCardDetailsRef.current,
    bankDetails,
    bankCode,
    setBankCode,
  };
};
