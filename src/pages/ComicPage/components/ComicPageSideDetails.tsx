import { Accordion, AccordionDetails, AccordionSummary, Grid2 } from '@mui/material';
import { useEffect } from 'react';
import { MdExpandMore } from 'react-icons/md';

import { useLazyGetComicsQuery } from '~/apis/comicApis.ts';
import { Button, DataFetching, Typography } from '~/components/index.ts';
import { getComicsByGenreRoute } from '~/constants/routeConstants.ts';
import { ComicCard } from '~/features/index.ts';
import { Comic } from '~/types/comicType.ts';
import { toSentenceCase } from '~/utils/converters.ts';

function ComicType({ type }: { type: Comic['type'] }) {
  return (
    <div>
      <Typography>Type:</Typography>
      <Typography component="span">{toSentenceCase(type)}</Typography>
    </div>
  );
}

function ReleaseYear({ year }: { year: number }) {
  return (
    <div>
      <Typography>Release year:</Typography>
      <Typography component="span">{year}</Typography>
    </div>
  );
}

function Tags({ tags }: { tags: Comic['tags'] }) {
  return (
    <div>
      <Typography>Tags:</Typography>
      <div className="flex flex-wrap gap-1">
        {tags.map((tag) => (
          <Button
            href={getComicsByGenreRoute(tag.name)}
            variant="outlined"
            size="small"
            key={tag.id}
          >
            {tag.name}
          </Button>
        ))}
      </div>
    </div>
  );
}

function AdditionalDetails(comic: Comic) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<MdExpandMore />}>
        <Typography variant="h6">Additional Information</Typography>
      </AccordionSummary>
      <AccordionDetails className="flex flex-col gap-1 *:flex *:gap-2">
        <ComicType type={comic.type} />
        <ReleaseYear year={comic.year} />
        <Tags tags={comic.tags} />
      </AccordionDetails>
    </Accordion>
  );
}

function RelatedComics({ comicsId }: { comicsId: Comic['id'][] }) {
  const [getComics, { data: related = [], isFetching }] = useLazyGetComicsQuery();

  useEffect(() => {
    if (comicsId.length > 0) {
      getComics({
        ids: comicsId as Comic['id'][],
        _embed: ['cover_art'],
      });
    }
  }, [comicsId]);

  if (isFetching) {
    return <DataFetching />;
  }

  if (related.length === 0) {
    return null;
  }

  return (
    <Accordion>
      <AccordionSummary expandIcon={<MdExpandMore />}>
        <Typography variant="h6">Related Comics</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid2 container spacing={2}>
          {related.map((relatedComic) => (
            <Grid2
              key={relatedComic.id}
              size={{
                md: 1.714,
                sm: 4,
              }}
            >
              <ComicCard {...relatedComic} />
            </Grid2>
          ))}
        </Grid2>
      </AccordionDetails>
    </Accordion>
  );
}

function ComicPageSideDetails(comic: Comic) {
  return (
    <>
      <AdditionalDetails {...comic} />
      <RelatedComics comicsId={(comic.related as Comic['id'][]) || []} />
    </>
  );
}

export default ComicPageSideDetails;
