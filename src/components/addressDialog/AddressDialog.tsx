import React, { useState } from "react";

import AddressForm from "../addressForm/AddressForm";
import AddressBook from "../addressBook/AddressBook";

import "./style.css";

const AddressDialog = () => {
  const [addAddress, setAddAddress] = useState(false);

  return (
    <div className="bg-white" id="address_dialog">
      {!addAddress && <AddressBook setAddAddress={setAddAddress} />}
      {addAddress && <AddressForm setAddAddress={setAddAddress} />}
    </div>
  );
};

export default AddressDialog;
