import { Grid2 } from '@mui/material';

import { Image } from '~/components/index.ts';
import { Comic } from '~/types/index.ts';
import Actions from './ComicPageDetailsActions.tsx';
import Artists from './ComicPageDetailsArtists';
import Authors from './ComicPageDetailsAuthors';
import Description from './ComicPageDetailsDescription';
import Title from './ComicPageDetailsTitle.tsx';

function ComicPageDetails(comic: Comic) {
  return (
    <Grid2 container spacing={2} size={{ lg: 12 }}>
      <Grid2 size={{ md: 4, sm: 12 }} className="flex justify-center w-full lg:justify-normal">
        <Image
          src={comic.coverImageUrl}
          alt={comic.title}
          className="h-[270px] rounded-md shadow-[3px_2px_3px_0px_rgba(0,0,0,0.15)]"
        />
      </Grid2>
      <Grid2 size={{ md: 8, sm: 12 }} className="flex flex-col">
        <Title title={comic.title} altTitles={comic.altTitles} status={comic.status} />
        {comic.authors && <Authors authors={comic.authors} />}
        {comic.artists && <Artists artists={comic.artists} />}
        <Description content={comic.description} />
        <Actions title={comic.title} id={comic.id} />
      </Grid2>
    </Grid2>
  );
}

export default ComicPageDetails;
