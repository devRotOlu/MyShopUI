import { RefObject, useEffect } from "react";
import throttle from "lodash.throttle";

export const useCalHeightOnResize = (ref: RefObject<HTMLElement>, property: string) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const updateHeight = () => {
      const height = element.offsetHeight;
      document.documentElement.style.setProperty(property, `${height}px`);
    };
    updateHeight();
    requestAnimationFrame(() => {
      requestAnimationFrame(updateHeight);
    });
    const timeout = setTimeout(updateHeight, 500);
    const handleResize = throttle(() => {
      updateHeight();
    }, 100);
    window.addEventListener("resize", handleResize);
    const observer = new ResizeObserver(handleResize);
    observer.observe(element);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
      handleResize.cancel();
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, property]);
};
