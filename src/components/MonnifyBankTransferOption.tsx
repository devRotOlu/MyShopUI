import React, { useContext, ChangeEvent, FormEvent, useEffect } from "react";

import FormComp from "./formComp/FormComp.tsx";
import TextInput from "./textInput/TextInput.tsx";
import FormButton from "./formButton/FormButton.tsx";
import ComponentOverlay from "./ComponentOverlay.tsx.tsx";
import TransferDetails from "./transferDetails/TransferDetails.tsx";
import TransferDetailsTable from "./transferDetailsTable/TransferDetailsTable.tsx";
import MonnifyPaymentOptionTitle from "./MonnifyPaymentOptionTitle.tsx";
import ResetPayOptionBtn from "../monnify/ResetPayOptionBtn.tsx";
import Loader from "./Loader.tsx";

import { checkoutContext } from "./checkout/Checkout.tsx";

const MonnifyBankTransferOption = () => {
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
      <MonnifyPaymentOptionTitle title="TRANSFER">
        <ResetPayOptionBtn />
      </MonnifyPaymentOptionTitle>
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
                    <Loader color="white" size="spinner-border-sm" />
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

export default MonnifyBankTransferOption;
