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
      <li key={id} className="w-md-auto w-sm-100 h-md-100 flex-shrink-0">
        <Link className="h-100 border-top-md-0 py-md-0 py-3 d-flex align-items-md-center justify-content-md-center px-md-4 category_link" to={`/category/${link}`}>
          {name}
        </Link>
      </li>
    );
  });

  return (
    <div className="position-relative py-4 d-block" id="category_list_wrapper">
      <div className="w-100 left-0 right-0">
        <ul className="d-md-flex align-items-center p-0 m-0 overflow-auto">{_categoryLinks}</ul>
        <div className="position-relative d-md-block d-none" id="category_list_scroll"></div>
      </div>
    </div>
  );
};

export default CategoryList;
