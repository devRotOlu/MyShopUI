import React from "react";
import ReactMarkdown from "react-markdown";

import { productDescriptionProps } from "../../types/types";
import "./style.css";

const ProductDescription = ({ description, attributes }: productDescriptionProps) => {
  const _attributes = attributes.map((attr, index) => {
    const {
      value,
      attribute: { name, unit },
    } = attr;
    return (
      <tr key={index}>
        <th className="w-50 px-3 py-2 border text-muted">{name}</th>
        <td className="w-50 px-3 py-2 border text-muted">
          {value}
          {unit}
        </td>
      </tr>
    );
  });
  return (
    <div className="py-3" id="product_description">
      <table className="w-100 mb-4">{_attributes}</table>
      <div className="text-muted">
        <ReactMarkdown>{description}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ProductDescription;
