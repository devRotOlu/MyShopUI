import { useSearchParams } from "react-router-dom";
import { useFilterQueryParamsDataType } from "../types";

export const useFilterQueryParams = (): useFilterQueryParamsDataType => {
  const [searchParams] = useSearchParams();
  const min = Number(searchParams.get("min")) || undefined;
  const max = Number(searchParams.get("max")) || undefined;
  const rating = Number(searchParams.get("rating")) || undefined;
  return { min, max, rating };
};
