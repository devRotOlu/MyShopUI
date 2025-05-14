import React, { useState } from "react";

import AddressForm from "./addressForm/AddressForm";
import AddressBook from "./addressBook/AddressBook";

const AddressDialog = () => {
  const [addAddress, setAddAddress] = useState(false);

  return (
    <div className="h-100 bg-white" id="address_dialog">
      {!addAddress && <AddressBook setAddAddress={setAddAddress} />}
      {addAddress && <AddressForm setAddAddress={setAddAddress} />}
    </div>
  );
};

export default AddressDialog;
