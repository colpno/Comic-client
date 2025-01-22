import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import { useGetGenresQuery } from '~/apis/genreApis.ts';
import { Button } from '~/components/index.ts';
import { MUI_CONTAINER_MAX_WIDTH, PAGINATION_INITIAL_PAGE } from '~/constants/commonConstants.ts';
import { getComicsByGenreRoute } from '~/constants/routeConstants.ts';
import { useDeviceWatcher } from '~/hooks/useDeviceWatcher.ts';
import { backgroundImage1 } from '~/images/index.ts';
import { Genre } from '~/types/index.ts';
import { cn } from '~/utils/cssUtils.ts';

function HomePageGenreContainer() {
  const device = useDeviceWatcher();
  const { data: oriGenres } = useGetGenresQuery();
  const [{ perPage, page }, setPagination] = useState({
    page: PAGINATION_INITIAL_PAGE,
    perPage: 20,
  });
  const [genres, setGenres] = useState<Genre[] | null>(null);
  const navigatorsClassName =
    'absolute flex items-center justify-center text-gray-500 transition-opacity ease-out -translate-y-1/2 top-1/2 z-slider-navigators';
  const isPrevDisabled = page === PAGINATION_INITIAL_PAGE;
  const isNextDisabled = genres?.length !== perPage;

  useEffect(() => {
    const paginationStart = page * perPage;
    const paginationEnd = (page + 1) * perPage;
    setGenres(oriGenres?.slice(paginationStart, paginationEnd) || null);
  }, [oriGenres?.length, page, setGenres, perPage]);

  useEffect(() => {
    switch (device) {
      case 'mobile':
        setPagination({ page: PAGINATION_INITIAL_PAGE, perPage: 5 });
        break;
      case 'tablet':
        setPagination({ page: PAGINATION_INITIAL_PAGE, perPage: 14 });
        break;
      default:
        setPagination({ page: PAGINATION_INITIAL_PAGE, perPage: 20 });
        break;
    }
  }, [setPagination, device]);

  const handleClickPrev = () => {
    setPagination(({ page, ...prev }) => ({ ...prev, page: !isPrevDisabled ? page - 1 : page }));
  };
  const handleClickNext = () => {
    setPagination(({ page, ...prev }) => ({ ...prev, page: !isNextDisabled ? page + 1 : page }));
  };

  if (!genres) return null;

  return (
    <Container
      maxWidth={MUI_CONTAINER_MAX_WIDTH}
      sx={{
        // Background image
        '&:after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          background: `url(${backgroundImage1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.5,
          filter: 'blur(10px)',
        },
      }}
      className="relative mt-12 mb-8 h-[235px] grid place-items-center"
    >
      <div
        className={cn(
          'flex flex-wrap items-center justify-center gap-2 px-4 py-16',
          device === 'mobile' && 'py-8 px-8',
          device === 'tablet' && 'py-12 px-8'
        )}
      >
        {genres.map((genre) => (
          <Button
            href={getComicsByGenreRoute(genre.name)}
            key={genre.id}
            variant="outlined"
            size="small"
          >
            {genre.name}
          </Button>
        ))}
      </div>
      <Button
        as="unstyled"
        className={cn(
          navigatorsClassName,
          '-left-8',
          device !== 'desktop' && 'left-0',
          isPrevDisabled && 'opacity-0'
        )}
        onClick={handleClickPrev}
        disabled={isPrevDisabled}
      >
        <MdKeyboardArrowLeft fontSize={48} />
      </Button>
      <Button
        as="unstyled"
        className={cn(
          navigatorsClassName,
          '-right-8',
          device !== 'desktop' && 'right-0',
          isNextDisabled && 'opacity-0'
        )}
        onClick={handleClickNext}
        disabled={isNextDisabled}
      >
        <MdKeyboardArrowRight fontSize={48} />
      </Button>
    </Container>
  );
}

export default HomePageGenreContainer;
