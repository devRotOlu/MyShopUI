import React, { useContext, ChangeEvent, FormEvent } from "react";

import FormComp from "../../formComp/FormComp";
import TextInput from "../../textInput/TextInput";
import FormButton from "../../formButton/FormButton";
import ComponentOverlay from "../../ComponentOverlay.tsx";
import TransferDetails from "./TransferDetails.tsx";
import TransferDetailsTable from "./TransferDetailsTable.tsx";
import PaymentTitle from "./PaymentTitle.tsx";
import ResetPayOptionBtn from "./ResetPayOptionBtn.tsx";

import { checkoutContext } from "../Checkout.tsx";

const BankTransfer = () => {
  const { bankCode, setBankCode, sendTransferDetails, isFetchingTransferDetails, detailsSent, isTransactionSuccessful } = useContext(checkoutContext);

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
              {isFetchingTransferDetails && <ComponentOverlay />}
            </div>
          </>
        </FormComp>
      </div>
    </>
  );
};

export default BankTransfer;
