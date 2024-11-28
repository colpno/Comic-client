import { Grid2 } from '@mui/material';

import { Button, Image, Typography } from '~/components/index.ts';
import { getComicReadingRoute } from '~/constants/routeConstants.ts';
import { Comic } from '~/types/comicType.ts';

interface TitleProps {
  title: Comic['title'];
  altTitles: Comic['altTitles'];
  status: Comic['status'];
}

function Title({ title, altTitles, status }: TitleProps) {
  const getComicStatusColor = () => {
    switch (status) {
      case 'ongoing':
      case 'completed':
        return 'success';

      case 'hiatus':
        return 'warning';

      case 'cancelled':
        return 'error';

      default:
        return 'primary';
    }
  };

  return (
    <>
      <div className="flex items-center">
        <Typography variant="h5" className="line-clamp-1" title={title}>
          {title}
        </Typography>
        <Typography variant="body2" color={getComicStatusColor()} className="!ml-2">
          {status}
        </Typography>
      </div>
      {altTitles && (
        <div className="line-clamp-1" title={altTitles.map((title) => title).join('; ')}>
          <Typography variant="body2">{altTitles.map((title) => title).join('; ')}</Typography>
        </div>
      )}
    </>
  );
}

function Authors({ authors }: { authors: Comic['authors'] }) {
  return (
    <div className="flex gap-1 mt-2" title={authors.map((author) => author.name).join(', ')}>
      <Typography variant="subtitle2" className="font-semibold">
        Authors:
      </Typography>
      <div>
        <Typography variant="subtitle2" className="italic line-clamp-1">
          {authors.map((author) => author.name).join(', ')}
        </Typography>
      </div>
    </div>
  );
}

function Artists({ artists }: { artists: Comic['artists'] }) {
  return (
    <div className="flex gap-1" title={artists.map((artist) => artist.name).join(', ')}>
      <Typography variant="subtitle2" className="font-semibold">
        Artists:
      </Typography>
      <div>
        <Typography variant="subtitle2" className="italic line-clamp-1">
          {artists.map((artist) => artist.name).join(', ')}
        </Typography>
      </div>
    </div>
  );
}

function Description({ content }: { content: Comic['description'] }) {
  return (
    <Typography className="!mt-4 line-clamp-3" title={content}>
      {content}
    </Typography>
  );
}

interface ButtonsProps {
  comicId: Comic['id'];
  latestChapterNumber: Comic['latestUploadedChapter'];
}

function Buttons({ comicId, latestChapterNumber }: ButtonsProps) {
  return (
    <div className="flex flex-col gap-2 mt-6 lg:mt-auto sm:flex-row">
      <Button variant="contained" color="primary" href={getComicReadingRoute(comicId, 1)}>
        Read chapter 1
      </Button>
      {latestChapterNumber && (
        <Button
          variant="outlined"
          color="primary"
          href={getComicReadingRoute(comicId, latestChapterNumber)}
        >
          Read latest chapter
        </Button>
      )}
    </div>
  );
}

function ComicPageDetails(comic: Comic) {
  return (
    <Grid2
      container
      spacing={2}
      size={{
        lg: 12,
      }}
    >
      <Grid2
        size={{
          md: 4,
          sm: 12,
        }}
        className="flex justify-center w-full lg:justify-normal"
      >
        <Image
          src={comic.coverImageUrl}
          alt={comic.title}
          className="h-[270px] rounded-md shadow-[3px_2px_3px_0px_rgba(0,0,0,0.15)]"
        />
      </Grid2>
      <Grid2
        size={{
          md: 8,
          sm: 12,
        }}
        className="flex flex-col"
      >
        <Title title={comic.title} altTitles={comic.altTitles} status={comic.status} />
        <Authors authors={comic.authors} />
        <Artists artists={comic.artists} />
        <Description content={comic.description} />
        <Buttons comicId={comic.id} latestChapterNumber={comic.latestUploadedChapter} />
      </Grid2>
    </Grid2>
  );
}

export default ComicPageDetails;
