import { useSearchParams } from "react-router-dom";

import { useGetQueryParamsDataType } from "../types";

export const useGetQueryParams = (): useGetQueryParamsDataType => {
  const [searchParams] = useSearchParams();
  const min = Number(searchParams.get("min")) || undefined;
  const max = Number(searchParams.get("max")) || undefined;
  const rating = Number(searchParams.get("rating")) || undefined;
  const sortOrder = searchParams.get("sortOrder") || undefined;
  return { min, max, rating, sortOrder };
};
