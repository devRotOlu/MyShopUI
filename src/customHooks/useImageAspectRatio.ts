import { useState, useEffect } from "react";

interface UseImageAspectRatioResult {
  aspectRatio: number;
}

export const useImageAspectRatio = (imageUrl?: string): UseImageAspectRatioResult => {
  const [aspectRatio, setAspectRatio] = useState<number>(1);

  useEffect(() => {
    if (!imageUrl) return;

    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      if (img.naturalHeight === 0) {
        return;
      }

      const ratio = img.naturalWidth / img.naturalHeight;
      setAspectRatio(ratio);
    };
  }, [imageUrl]);

  return { aspectRatio };
};
