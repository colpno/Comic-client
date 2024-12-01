import { faker } from '@faker-js/faker';
import { Container } from '@mui/material';
import { SwiperSlide } from 'swiper/react';
import { v4 } from 'uuid';

import Image from '~/components/Image.tsx';
import Typography from '~/components/Typography.tsx';
import { PlaceholderImage } from '~/images/index.ts';
import { useReadingLayoutContext } from '~/layouts/ReadingLayout/ReadingLayoutContext.ts';
import { Chapter } from '~/types/chapterType.ts';
import { cn } from '~/utils/cssUtils.ts';
import ReadingPageSlider from './components/ReadingPageSlider.tsx';

const images = faker.helpers.multiple<Chapter['content'][number]>(
  () => ({
    data: faker.image.urlPicsumPhotos(),
    dataSaver: faker.image.urlPlaceholder(),
  }),
  {
    count: faker.helpers.rangeToNumber({ min: 5, max: 10 }),
  }
);

function ReadingPage() {
  const { toggleHeaderVisibility } = useReadingLayoutContext();

  return (
    <div>
      <div onClick={toggleHeaderVisibility}>
        {images.map((img, i) => (
          <Image
            src={img.dataSaver || img.data}
            onLoad={({ currentTarget }) => (currentTarget.src = img.data)}
            alt={`Image ${i + 1}`}
            className="w-full md:w-[728px] mx-auto"
            key={v4()}
          />
        ))}
      </div>
      <Container maxWidth="lg" className="mt-24 md:mt-40">
        <ReadingPageSlider>
          <div>
            {images.map((img, i) => (
              <SwiperSlide key={v4()}>
                {({ isActive }) => (
                  <>
                    <Image
                      lazy
                      src={img.dataSaver || img.data}
                      onLoad={({ currentTarget }) => (currentTarget.src = img.data)}
                      alt={`Image ${i + 1}`}
                      onError={({ currentTarget }) => {
                        currentTarget.src = PlaceholderImage;
                      }}
                      className={cn(
                        'w-full aspect-[8/11] rounded-md',
                        isActive && 'shadow-[0_0_10px_rgba(255,0,0,0.3)]'
                      )}
                    />
                    <Typography className={cn('line-clamp-1', isActive && 'text-primary')}>
                      Chapter {i + 1}
                    </Typography>
                  </>
                )}
              </SwiperSlide>
            ))}
          </div>
        </ReadingPageSlider>
      </Container>
    </div>
  );
}

export default ReadingPage;
