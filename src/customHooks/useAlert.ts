import { useState, useEffect } from "react";

export const useAlert = (shouldDisplay: boolean) => {
  const [isDisplayed, setIsDisplayed] = useState<boolean>(false);

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
