import { Accordion, AccordionDetails, AccordionSummary, Grid2 } from '@mui/material';
import { MdExpandMore } from 'react-icons/md';

import { Button, Typography } from '~/components/index.ts';
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
      <div>
        {tags.map((tag) => (
          <Button variant="outlined" size="small" key={tag.id}>
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

function RelatedComics({ comics }: { comics: Comic[] }) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<MdExpandMore />}>
        <Typography variant="h6">Related Comics</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid2 container spacing={2}>
          {(comics as Comic[]).map((relatedComic) => (
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
      {comic.related && comic.related.length > 0 && (
        <RelatedComics comics={comic.related as Comic[]} />
      )}
    </>
  );
}

export default ComicPageSideDetails;
