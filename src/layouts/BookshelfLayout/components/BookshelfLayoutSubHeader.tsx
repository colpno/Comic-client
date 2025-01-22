import { Container } from '@mui/material';

import Image from '~/components/Image.tsx';
import { Typography } from '~/components/index.ts';
import { MUI_CONTAINER_MAX_WIDTH } from '~/constants/commonConstants.ts';
import { booksSVG } from '~/images/index.ts';
import Navigation from './BookshelfLayoutSubHeaderNavigators.tsx';

function BookshelfLayoutSubHeader() {
  return (
    <div className="border-b border-gray-300 dark:border-gray-800">
      <Container
        maxWidth={MUI_CONTAINER_MAX_WIDTH}
        className="flex items-center justify-between py-1"
      >
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
          <Image src={booksSVG} alt="Bookshelf logo" className="w-9" />
          <Typography variant="h5" className="!font-semibold">
            Bookshelf
          </Typography>
        </div>
        <Navigation />
      </Container>
    </div>
  );
}

export default BookshelfLayoutSubHeader;
