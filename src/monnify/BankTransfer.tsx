import React, { useContext, ChangeEvent, FormEvent, useEffect } from "react";

import FormComp from "../components/formComp/FormComp.tsx";
import TextInput from "../components/textInput/TextInput.tsx";
import FormButton from "../components/formButton/FormButton.tsx";
import ComponentOverlay from "../components/ComponentOverlay.tsx.tsx";
import TransferDetails from "../components/transferDetails/TransferDetails.tsx";
import TransferDetailsTable from "../components/transferDetailsTable/TransferDetailsTable.tsx";
import PaymentTitle from "./PaymentTitle.tsx";
import ResetPayOptionBtn from "./ResetPayOptionBtn.tsx";

import { checkoutContext } from "../components/checkout/Checkout.tsx";
import Loader from "../components/Loader.tsx";

const BankTransfer = () => {
  const { bankCode, setBankCode, sendTransferDetails, isFetchingTransferDetails, detailsSent, isTransactionSuccessful } = useContext(checkoutContext);

  useEffect(() => {
    return () => setBankCode("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBankCode = (event: ChangeEvent<HTMLInputElement>) => {
    setBankCode(event.target.value);
  };

  const handleDetailsSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendTransferDetails();
  };

  if (detailsSent && !isTransactionSuccessful) {
    return (
      <TransferDetails>
        <TransferDetailsTable />
      </TransferDetails>
    );
  }

  return (
    <>
      <PaymentTitle title="TRANSFER">
        <ResetPayOptionBtn />
      </PaymentTitle>
      <div className="pt-3 pb-5 px-3">
        <FormComp handleFormSubmit={handleDetailsSubmit} styles={{ backgroundColor: "inherit" }}>
          <>
            <TextInput value={bankCode} handleChange={handleBankCode} name="bankCode" type="text">
              <p>Bank Code</p>
            </TextInput>
            <div className="position-relative">
              <FormButton value="Pay Now" styles={{ backgroundColor: "var(--lighter_pink)" }} />
              {isFetchingTransferDetails && (
                <ComponentOverlay>
                  <div className="d-flex align-items-center justify-content-center h-100">
                    <Loader color="white" size="small" />
                  </div>
                </ComponentOverlay>
              )}
            </div>
          </>
        </FormComp>
      </div>
    </>
  );
};

export default BankTransfer;
