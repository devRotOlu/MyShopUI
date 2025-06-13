import { useEffect } from "react";

export const useCalHeightOnResize = (element: HTMLElement, property: string) => {
  useEffect(() => {
    const updateHeight = () => {
      if (element) {
        const height = element.offsetHeight;
        document.documentElement.style.setProperty(property, `${height}px`);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
