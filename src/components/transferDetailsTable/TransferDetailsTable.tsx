import React, { useContext } from "react";

import { checkoutContext } from "../checkout/Checkout";
import { naira } from "../../data";
import "./style.css";

const TransferDetailsTable = () => {
  const {
    bankDetails: { accountName, accountNumber, ussdPayment, bankName, totalPayable, fee },
  } = useContext(checkoutContext);
  return (
    <table className="w-100" id="transfer_details_table">
      <tr>
        <th className="w-50 pb-sm-0 pb-2">Total Payable:</th>
        <td className="w-50 ps-3 pb-sm-0 pb-2">
          {naira}
          {totalPayable.toLocaleString()}
        </td>
      </tr>
      <tr>
        <th className="w-50 pb-sm-0 pb-2">Charges:</th>
        <td className="w-50 ps-3 pb-sm-0 pb-2">
          {naira}
          {fee.toLocaleString()}
        </td>
      </tr>
      <tr>
        <th className="w-50 pb-sm-0 pb-2">Bank Name:</th>
        <td className="w-50 ps-3 pb-sm-0 pb-2">{bankName}</td>
      </tr>
      <tr>
        <th className="w-50 pb-sm-0 pb-2">Account Number:</th>
        <td className="w-50 ps-3 pb-sm-0 pb-2">{accountNumber}</td>
      </tr>
      <tr>
        <th className="w-50 pb-sm-0 pb-2">Account Name:</th>
        <td className="w-50 ps-3 pb-sm-0 pb-2">{accountName}</td>
      </tr>
      <tr>
        <th className="w-50 pb-sm-0 pb-2">USSD code:</th>
        <td className="w-50 ps-3 pb-sm-0 pb-2">{ussdPayment}</td>
      </tr>
    </table>
  );
};

export default TransferDetailsTable;
