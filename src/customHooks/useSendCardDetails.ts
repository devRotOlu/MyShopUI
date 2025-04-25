import { useMutation } from "@tanstack/react-query";
import { sendCardDetails } from "../helperFunctions/dataFetchFunctions";

const useSendCardDetails = () => {
  const {
    mutate: _sendCardDetails,
    isSuccess: cardDetailsSent,
    isPending: sendingCardDetails,
    isError: isCardPaymentError,
  } = useMutation({
    mutationFn: sendCardDetails,
  });
};
