import { CircularProgress } from '@mui/material';
import { v1 } from 'uuid';

import ImageComponent from '~/components/Image.tsx';
import { Typography } from '~/components/index.ts';
import { proxyServerUrl } from '~/configs/appConf.ts';
import useLoadImages from '~/hooks/useLoadImages.ts';
import { placeholderImage } from '~/images/index.ts';
import { Chapter } from '~/types/index.ts';

function Images({ images }: Props) {
  return images.map((img, i) => {
    const data = `${proxyServerUrl}/${img.data}`;
    const dataSaver = `${proxyServerUrl}/${img.dataSaver}`;

    return (
      <ImageComponent
        src={dataSaver || placeholderImage}
        onLoad={({ currentTarget }) => (currentTarget.src = data)}
        alt={`Page ${i + 1}`}
        className="w-full md:w-[728px]"
        key={`${v1()}-${i}`}
      />
    );
  });
}

interface Props {
  images: Chapter['content'];
}

function ReadingPageContent({ images }: Props) {
  const imagesLoaded = useLoadImages(images.map((img) => img.data));

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
      <Images images={images} />
    </div>
  );
}

export default ReadingPageContent;
