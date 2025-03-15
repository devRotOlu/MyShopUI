import React, { useContext } from "react";

import { checkoutContext } from "../Checkout";

const TransferDetailsTable = () => {
  const {
    bankDetails: { accountName, accountNumber, ussdPayment, bankName, totalPayable, fee },
  } = useContext(checkoutContext);
  return (
    <table className="w-100">
      <tr>
        <th>Total Payable</th>
        <td>&#8358;{totalPayable}</td>
      </tr>
      <tr>
        <th>Charges</th>
        <td>&#8358;{fee}</td>
      </tr>
      <tr>
        <th>Bank Name</th>
        <td>{bankName}</td>
      </tr>
      <tr>
        <th>Account Number</th>
        <td>{accountNumber}</td>
      </tr>
      <tr>
        <th>Account Name</th>
        <td>{accountName}</td>
      </tr>
      <tr>
        <th>USSD code</th>
        <td>{ussdPayment}</td>
      </tr>
    </table>
  );
};

export default TransferDetailsTable;
