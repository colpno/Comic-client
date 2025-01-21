import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';

import ImageComponent from '~/components/Image.tsx';
import { Typography } from '~/components/index.ts';
import { proxyServerUrl } from '~/configs/appConf.ts';
import { placeholderImage } from '~/images/index.ts';
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
    <div className="mx-auto shadow-xl w-full md:w-[728px]">
      {!imagesLoaded && (
        <div className="flex flex-col items-center justify-center px-6 h-dvh">
          <CircularProgress />
          <Typography variant="h6" className="!mt-8 text-center">
            Please wait patiently as images are loading...
          </Typography>
          <Typography variant="body2" className="text-center">
            You can read now but it will give bad experience.
          </Typography>
        </div>
      )}
      {images.map((img, i) => {
        const data = `${proxyServerUrl}/${img.data}`;
        const dataSaver = `${proxyServerUrl}/${img.dataSaver}`;

        return (
          <ImageComponent
            src={dataSaver || placeholderImage}
            onLoad={({ currentTarget }) => (currentTarget.src = data)}
            alt={`Page ${i + 1}`}
            className="w-full md:w-[728px]"
            key={`${id}-image-${i + 1}`}
          />
        );
      })}
    </div>
  );
}

export default ReadingPageImages;
