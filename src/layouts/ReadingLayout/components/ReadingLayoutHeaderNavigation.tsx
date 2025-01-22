import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

import { Button, Typography } from '~/components/index.ts';

interface Props {
  onPrevClick: () => void;
  onNextClick: () => void;
  chapter: string;
}

function ReadingLayoutHeaderNavigation({ onPrevClick, onNextClick, chapter }: Props) {
  return (
    <nav className="absolute flex items-center gap-2 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 md:gap-4">
      <Button as="iconButton" color="inherit" onClick={onPrevClick}>
        <FaChevronLeft fontSize={18} />
      </Button>
      <Typography variant="h6">{chapter}</Typography>
      <Button as="iconButton" color="inherit" onClick={onNextClick}>
        <FaChevronRight fontSize={18} />
      </Button>
    </nav>
  );
}

export default ReadingLayoutHeaderNavigation;
