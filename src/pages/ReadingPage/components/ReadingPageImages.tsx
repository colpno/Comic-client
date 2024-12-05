import { useEffect, useState } from 'react';

import ImageComponent from '~/components/Image.tsx';
import Loading from '~/components/Loading.tsx';
import { Chapter } from '~/types/chapterType.ts';

interface Props {
  id: Chapter['id'];
  images: Chapter['content'];
}

function ReadingPageImages({ images, id }: Props) {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Wait for all images to load
  useEffect(() => {
    const imagePromises = images.map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src.data;
        img.onload = resolve;
        img.onerror = resolve;
      });
    });

    Promise.all(imagePromises).then(() => {
      setImagesLoaded(true);
    });
  }, [images]);

  return (
    <>
      {!imagesLoaded && <Loading />}
      {images.map((img, i) => (
        <ImageComponent
          src={img.dataSaver || img.data}
          onLoad={({ currentTarget }) => (currentTarget.src = img.data)}
          alt={`Page ${i + 1}`}
          className="w-full md:w-[728px]"
          key={`${id}-image-${i + 1}`}
        />
      ))}
    </>
  );
}

export default ReadingPageImages;
