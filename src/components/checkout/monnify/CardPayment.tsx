import React, { useState, FormEvent, useContext, FocusEvent } from "react";
import * as crypto from "crypto-js";
import Cards, { Focused } from "react-credit-cards-2";
import * as nodeForge from "node-forge";

import FormComp from "../../formComp/FormComp";
import FormButton from "../../formButton/FormButton";
import TextInput from "../../textInput/TextInput";
import PaymentTitle from "./PaymentTitle";
import ResetPayOptionBtn from "./ResetPayOptionBtn";

import { cardType, cardRequestType } from "../../../types";
import { sendCardDetails, appendBuffer, base64ToArrayBuffer, arrayBufferToBase64 } from "../../../helperFunctions/dataFetchFunctions";
import { appContext } from "../../context/AppContext";
import { checkoutContext } from "../Checkout";

const privateKey: string = process.env.REACT_APP_Crypto_Key!;
const iv: string = process.env.REACT_APP_Crypto_IV!;
const RSAPublicKey: string = process.env.REACT_APP_RSA_Public_Key!;

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
  } = useContext(appContext);

  const { transactionRef, sendCardDetails, isCardPaymentError } = useContext(checkoutContext);

  const [card, setCard] = useState<cardType>({
    number: "",
    cvv: "",
    expiry: "",
    pin: "",
  });

  const [focus, setFocus] = useState<Focused>("");

  const handleCardRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { cvv, number, expiry, pin } = card;
    const expiryMonth = expiry[0] + expiry[1];
    let expiryYear = expiry[3] + expiry[4];
    const year = new Date().getFullYear();
    var yearCount = year % 100;
    if (Number(expiryYear) >= yearCount) {
      expiryYear = `${Math.trunc(year / 100)}` + `${expiryYear}`;
    } else {
      expiryYear = `${Math.trunc(year / 100) + 1}` + `${expiryYear}`;
    }
    const requestContent = {
      transactionReference: transactionRef,
      card: {
        number: number.replaceAll(" ", ""),
        expiryMonth,
        expiryYear,
        pin,
        cvv,
      },
    };

    const publicKey = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAnMfLT0MRPNqBotD7Q3hr
0By37Yb9uUgXXPtOWkxamajB1HL6i1fphFD/X1BroMJW5QHqPT4yE6MoPgk/346d
eS/4Zp7byYiRQz2Gpaec0BlvHuZiOJ/fhJm1XsU1vvDNMuFPoYVwYr8rYchZJHGJ
vWy6Nr8Di/8m36lIDeuUrkyu0M/LOqa11GGiGe8nmD4DNhCBW5AqwvlBaVkzUBxu
1PUuhVGb32DbZALP22ciKAxE2OrqrtkkWcT5A1k6FaqpSewYczno6XItHMvJqIEg
xn/3dnobZS33e7USzrmYqZ93or0DAoGvXEQEy2pTHHNYMk1UjKIHK9C7W5Te1fH9
mFBUuFaxFf/cNYrc5bxy3EmDZ45U8mjdfVKpLHr7dqHFtQsHbc+xaoA4opr8TUNH
E4FixNzk3pbMHXD4/ATf/gISszW8/5n/Sj7dwRuZjvin6U5GnsYWQHLQCJm7f8ip
w3X0E/JhULMCVAyBz9ADazj5xp9FN7T2UU/6wdruDVEbcS6xh0NOvXZRXjFVwN1v
6fnwQ2yf+GpLP1iQGH+4OV3E53Q4w9ByGISbkn/BGhsbo0lQQVE/mPu6FCO0SCsX
Fx5+MD53iPO0eNwA9Ylm0HByDGR4RWkiyBlrsSHmHks48LNk+mHj7gxHgAxTqPu6
CIkO9pKOBD9DZ25tVr1PWscCAwEAAQ==
-----END PUBLIC KEY-----
`;
    // console.log(publicKey, "key");
    // var rsa = nodeForge.pki.publicKeyFromPem(publicKey);
    // var encrytedData = window.btoa(rsa.encrypt("Olumide"));
    // mutate(encrytedData);

    // const jsonData = JSON.stringify(requestContent);
    // const encryptedData = crypto.AES.encrypt("Olumide", privateKey);

    // var encryptedBuffer = base64ToArrayBuffer(encryptedData.toString());
    // var ivBuffer = base64ToArrayBuffer(encryptedData.iv.toString(crypto.enc.Base64));
    // var finalBuffer = appendBuffer(ivBuffer, encryptedBuffer);

    // var data = crypto.AES.decrypt(encryptedData, crypto.enc.Utf8.parse(privateKey), {
    //   iv: crypto.enc.Utf8.parse(iv),
    //   mode: crypto.mode.CBC,
    //   padding: crypto.pad.Pkcs7,
    // });
    //console.log(data.toString(crypto.enc.Utf8), "data");
    //console.log(encryptedData.blockSize, "data");

    sendCardDetails(requestContent);
  };

  const handleCardChange = (event: FormEvent<HTMLInputElement>) => {
    let { value, name } = event.currentTarget;
    const { max_cvv, max_number, max_pin, max_expiry } = cardMaxChar;
    if (name === "number" && value.length > 4 && value.length <= 19) {
      value = splitString(value.replaceAll(" ", ""), " ", 4);
    }

    if (name === "expiry" && value.length > 2 && value.length <= max_expiry) {
      value = splitString(value.replaceAll("/", ""), "/", 2);
    }

    var toSetCard = (name === "number" && value.length <= max_number) || (name === "cvv" && value.length <= max_cvv) || (name === "pin" && value.length <= max_pin) || (name === "expiry" && value.length <= max_expiry);

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
      <PaymentTitle title="Card">
        <ResetPayOptionBtn />
      </PaymentTitle>
      <div className="d-flex gap-2 pt-3 pb-5 px-3">
        <Cards number={number} cvc={cvv} name={`${firstName} ${lastName}`} expiry={expiry} focused={focus} />
        <FormComp handleFormSubmit={handleCardRequest} styles={{ width: "100%" }}>
          <TextInput placeholder="Card Number" name="number" type="text" value={number} handleChange={handleCardChange} handleFocus={handleInputFocus} />
          <div className="d-flex justify-content-between gap-3">
            <TextInput placeholder="Expiry" name="expiry" type="text" value={expiry} handleChange={handleCardChange} handleFocus={handleInputFocus} />
            <TextInput placeholder="CVV" name="cvv" type="text" value={cvv} handleChange={handleCardChange} handleFocus={handleInputFocus} />
          </div>
          <TextInput placeholder="Pin" name="pin" type="text" value={pin} handleChange={handleCardChange} handleFocus={handleInputFocus} />
          <FormButton value="Pay Now" styles={{ backgroundColor: "var(--lighter_pink)" }} />
        </FormComp>
      </div>
    </>
  );
};

export default CardPayment;
