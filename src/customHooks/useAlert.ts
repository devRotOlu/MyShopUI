import { useState, useEffect, useRef } from "react";

export const useAlert = (shouldDisplay: boolean) => {
  const [isDisplayed, setIsDisplayed] = useState<boolean>(false);

  const isMoutedRef = useRef(true);

  if (shouldDisplay) {
    setIsDisplayed(true);
  }

  useEffect(() => {
    if (isDisplayed) {
      const myTimeOut = setTimeout(() => setIsDisplayed(false), 10000);
      return () => clearTimeout(myTimeOut);
    }
  }, [isDisplayed]);

  return { isDisplayed, setIsDisplayed };
};
