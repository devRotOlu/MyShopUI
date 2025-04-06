import React, { useState } from "react";

import ProfileList from "./ProfileList";

const AddressBook = () => {
  const [addAddress, setAddAddress] = useState(false);

  return (
    <div className="h-100vh bg-white" id="address_book">
      {!addAddress && <ProfileList />}
      {addAddress && <div></div>}
    </div>
  );
};

export default AddressBook;
