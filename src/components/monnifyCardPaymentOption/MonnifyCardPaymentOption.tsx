import React, { useState, FormEvent, useContext, FocusEvent } from "react";
import Cards, { Focused } from "react-credit-cards-2";

import FormComp from "../formComp/FormComp.tsx";
import FormButton from "../formButton/FormButton.tsx";
import TextInput from "../textInput/TextInput.tsx";
import MonnifyPaymentOptionTitle from "../MonnifyPaymentOptionTitle.tsx";
import ResetPayOptionBtn from "../../monnify/ResetPayOptionBtn.tsx";
import Loader from "../Loader.tsx";
import ComponentOverlay from "../ComponentOverlay.tsx.tsx";
import ValidationError from "../validationError/ValidationError.tsx";

import { cardType, cardPaymentType } from "../../types/types.ts";
import { userContext } from "../context/UserProvider.tsx";
import { checkoutContext } from "../checkout/Checkout.tsx";
import { deliveryContext } from "../context/DeliveryProfileProvider.tsx";
import "./style.css";
import { encryptData } from "../../helperFunctions/utilityFunctions.ts";
import { appContext } from "../context/AppProvider.tsx";
import { monnifyCardSchema } from "../../formSchemas.ts";
import { useValidation } from "../../customHooks/useValidation.ts";

const cardMaxChar = {
  max_pin: 4,
  max_cvv: 3,
  max_number: 22,
  max_expiry: 5,
};

const splitString = (value: string, separator: string, divisor: number): string => {
  let valueArray = value.split("");
  valueArray = valueArray.map((str, index) => {
    const position = index + 1;
    if (position !== 1 && position % divisor === 1) {
      return separator + str;
    }
    return str;
  });
  return valueArray.join("");
};

const CardPayment = () => {
  const {
    loginData: { lastName, firstName },
  } = useContext(userContext);

  const { publicKeyPem } = useContext(appContext);

  const { transactionRef, sendCardDetails, profileIndex, sendingCardDetails, orderInstruction, setIsMonnifyError } = useContext(checkoutContext);
  const { deliveryProfiles } = useContext(deliveryContext);
  const { validationErrors, testValidation } = useValidation(monnifyCardSchema);

  const [card, setCard] = useState<cardType>({
    number: "",
    cvv: "",
    expiry: "",
    pin: "",
  });

  const [focus, setFocus] = useState<Focused>("");

  const handleCardRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const _card = { ...card, number: card.number.replaceAll(" ", "") };
    const isValidated = testValidation(_card);
    if (!isValidated) return;
    const { cvv, number, expiry, pin } = card;
    const expiryMonth = expiry[0] + expiry[1];
    let expiryYear = expiry[3] + expiry[4];
    const year = new Date().getFullYear();
    const yearCount = year % 100;
    if (Number(expiryYear) >= yearCount) {
      expiryYear = `${Math.trunc(year / 100)}${expiryYear}`;
    } else {
      expiryYear = `${Math.trunc(year / 100) + 1}${expiryYear}`;
    }
    const profileId = deliveryProfiles[profileIndex].id;
    const requestContent: cardPaymentType = {
      profileId: Number(profileId),
      cardDetails: {
        transactionReference: transactionRef,
        card: {
          number: number.replaceAll(" ", ""),
          expiryMonth,
          expiryYear,
          pin,
          cvv,
        },
      },
      orderInstruction,
    };

    if (publicKeyPem) {
      const { encryptedBody, encryptedIV, encryptedKey } = await encryptData(requestContent, publicKeyPem);

      sendCardDetails({
        card: encryptedBody,
        key: encryptedKey,
        iv: encryptedIV,
      });
      return;
    }
    setIsMonnifyError(true);
  };

  const handleCardChange = (event: FormEvent<HTMLInputElement>) => {
    let { value } = event.currentTarget;
    const { name } = event.currentTarget;
    const { max_cvv, max_number, max_pin, max_expiry } = cardMaxChar;
    if (name === "number" && value.length > 4 && value.length <= 19) {
      value = splitString(value.replaceAll(" ", ""), " ", 4);
    }

    if (name === "expiry" && value.length > 2 && value.length <= max_expiry) {
      value = splitString(value.replaceAll("/", ""), "/", 2);
    }

    const toSetCard = (name === "number" && value.length <= max_number) || (name === "cvv" && value.length <= max_cvv) || (name === "pin" && value.length <= max_pin) || (name === "expiry" && value.length <= max_expiry);

    if (toSetCard) {
      setCard((prevCard) => ({ ...prevCard, [name]: value }));
    }
  };

  const handleInputFocus = (event: FocusEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name as Focused;
    setFocus(name);
  };

  const { number, cvv, pin, expiry } = card;
  return (
    <>
      <MonnifyPaymentOptionTitle title="Card">
        <ResetPayOptionBtn />
      </MonnifyPaymentOptionTitle>
      <div className="d-flex flex-sm-row flex-column pt-3 pb-5 px-3" id="card_payment">
        <Cards number={number} cvc={cvv} name={`${firstName} ${lastName}`} expiry={expiry} focused={focus} />
        <FormComp handleFormSubmit={handleCardRequest} styles={{ width: "100%" }}>
          <div>
            <TextInput placeholder="Card Number" name="number" type="text" value={number} handleChange={handleCardChange} handleFocus={handleInputFocus} />
            {validationErrors.number && <ValidationError error={validationErrors.number} />}
          </div>
          <div className="d-flex justify-content-between gap-3">
            <div>
              <TextInput placeholder="Expiry" name="expiry" type="text" value={expiry} handleChange={handleCardChange} handleFocus={handleInputFocus} />
              {validationErrors.expiry && <ValidationError error={validationErrors.expiry} />}
            </div>
            <div>
              <TextInput placeholder="CVV" name="cvv" type="text" value={cvv} handleChange={handleCardChange} handleFocus={handleInputFocus} />
              {validationErrors.cvv && <ValidationError error={validationErrors.cvv} />}
            </div>
          </div>
          <div>
            <TextInput placeholder="Pin" name="pin" type="text" value={pin} handleChange={handleCardChange} handleFocus={handleInputFocus} />
            {validationErrors.pin && <ValidationError error={validationErrors.pin} />}
          </div>
          <div className="position-relative">
            <FormButton value="Pay Now" styles={{ backgroundColor: "var(--lighter_pink)" }} />
            {sendingCardDetails && (
              <ComponentOverlay>
                <div className="d-flex align-items-center justify-content-center h-100">
                  <Loader color="white" size="small" />
                </div>
              </ComponentOverlay>
            )}
          </div>
        </FormComp>
      </div>
      <p className="text-center px-3" style={{ color: "var(--dark_wine)" }}>
        For successful checkout; card number - <span className="fw-bold">4000000000000002</span> , cvv - <span className="fw-bold">123</span>, pin - <span className="fw-bold">1234</span>, expiry- next month onwards
      </p>
    </>
  );
};

export default CardPayment;
