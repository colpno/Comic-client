import { useEffect, useState } from 'react';

/**
 * A hook that loads an array of images.
 * @param images an array of image URLs
 * @returns a boolean indicating whether all images have been loaded
 */
const useLoadImages = (images: string[]) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const imagePromises = images.map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = resolve;
      });
    });

    Promise.all(imagePromises).then(() => {
      setImagesLoaded(true);
    });
  }, [images]);

  return imagesLoaded;
};

export default useLoadImages;
