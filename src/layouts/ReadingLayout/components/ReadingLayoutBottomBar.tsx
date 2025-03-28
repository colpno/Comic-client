import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { HiBars3BottomLeft } from 'react-icons/hi2';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, Typography } from '~/components/index.ts';
import { getComicRoute } from '~/constants/routeConstants.ts';
import { cn } from '~/utils/cssUtils.ts';
import { useReadingLayoutContext } from '../ReadingLayoutContext.ts';

interface Props {
  isDisplay: boolean;
}

function ReadingLayoutBottomBar({ isDisplay }: Props) {
  const navigate = useNavigate();
  const { comicTitle, chapterNumber } = useParams();
  const comicPageHref = comicTitle ? getComicRoute(comicTitle) : undefined;
  const { pagination } = useReadingLayoutContext();

  const handlePrevClick = () => {
    const { previous } = pagination;

    if (previous) {
      navigate(previous);
    }
  };

  const handleNextClick = () => {
    const { next } = pagination;

    if (next) {
      navigate(next);
    }
  };

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 flex items-center justify-between bg-main shadow-[0_-2px_4px_rgba(0,0,0,0.1)] z-header transition-[opacity] ease-out',
        !isDisplay && 'hidden'
      )}
    >
      <nav>
        <Button
          as="iconButton"
          href={comicPageHref}
          color="inherit"
          title="Go back to the comic page"
        >
          <HiBars3BottomLeft />
        </Button>
      </nav>
      <div className="flex-1 pl-2 pr-4 line-clamp-1">
        <Typography>Ch.{chapterNumber}</Typography>
      </div>
      <nav className="flex items-center gap-2 md:gap-4">
        <Button
          as="iconButton"
          color="inherit"
          title="Go to the previous"
          onClick={handlePrevClick}
        >
          <FaChevronLeft fontSize={18} />
        </Button>
        <Button as="iconButton" color="inherit" title="Go to the next" onClick={handleNextClick}>
          <FaChevronRight fontSize={18} />
        </Button>
      </nav>
    </div>
  );
}

export default ReadingLayoutBottomBar;
