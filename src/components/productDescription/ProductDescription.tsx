import React from "react";
import ReactMarkdown from "react-markdown";

import { productDescriptionProps } from "../../types";

const ProductDescription = ({ description, attributes }: productDescriptionProps) => {
  const _attributes = attributes.map((attr, index) => {
    const {
      value,
      attribute: { name, unit },
    } = attr;
    return (
      <tr key={index}>
        <th className="w-50 p-3 border">{name}</th>
        <td className="w-50 p-3 border">
          {value}
          {unit}
        </td>
      </tr>
    );
  });
  return (
    <div className="py-3" id="product_description">
      <table className="w-100 mb-4">{_attributes}</table>
      {/* <p className="lh-lg text-wrap">{description}</p> */}
      <ReactMarkdown>{description}</ReactMarkdown>
    </div>
  );
};

export default ProductDescription;
