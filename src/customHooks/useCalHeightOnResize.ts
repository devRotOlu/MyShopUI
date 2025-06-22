import { useEffect } from "react";
import throttle from "lodash.throttle";

export const useCalHeightOnResize = (element: HTMLElement, property: string) => {
  useEffect(() => {
    if (!element) return;
    const updateHeight = () => {
      const height = element.offsetHeight;
      document.documentElement.style.setProperty(property, `${height}px`);
    };
    updateHeight();
    const handleResize = throttle(() => {
      updateHeight();
    }, 100);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      handleResize.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element, property]);
};
