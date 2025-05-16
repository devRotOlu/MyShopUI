import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import "./style.css";
import { getCategories } from "../../helperFunctions/dataFetchFunctions";
import { productCategoryType } from "../../types";

let wordsToRemove = ["and", "&", ",", " "];
let regex = new RegExp(wordsToRemove.join("|"), "gi");

const CategoryList = () => {
  const [categories, setCategories] = useState<productCategoryType[]>([]);

  const { data, isSuccess } = useQuery({
    queryKey: ["product_categories"],
    queryFn: getCategories,
  });

  useEffect(() => {
    if (isSuccess) {
      const categories = data?.data;
      setCategories(categories);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const _categoryLinks = categories.map(({ name, id }) => {
    let link = name.replace(regex, "-");
    link = link.replace(/-+/g, "-").toLowerCase() + "-" + id;
    return (
      <li key={id} className="h-100">
        <Link className="w-100 h-100 d-flex align-items-center justify-content-center px-4 category_link" to={`/category/${link}`}>
          {name}
        </Link>
      </li>
    );
  });

  return (
    <div className="position-relative py-4" id="category_list_wrapper">
      <div className="position-absolute w-100 left-0 right-0 h-100">
        <ul className="d-flex  align-items-center h-100 p-0 m-0">{_categoryLinks}</ul>
        <div className="position-relative" id="category_list_scroll"></div>
      </div>
    </div>
  );
};

export default CategoryList;
