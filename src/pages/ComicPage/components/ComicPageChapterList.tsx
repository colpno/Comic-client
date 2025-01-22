import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { MdExpandMore } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 } from 'uuid';

import { Typography } from '~/components/index.ts';
import { getComicReadingRoute } from '~/constants/routeConstants.ts';
import { Chapter } from '~/types/index.ts';
import ChapterFigure from './ComicPageChapterFigure.tsx';

interface Volume {
  volume: string;
  chapters: Chapter[];
}
interface Props {
  data: Volume[];
}

const overrideAccordionStyles = {
  '&.MuiAccordion-root': {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
};

function ComicPageChapterList({ data }: Props) {
  const { comictitle } = useParams();

  return (
    <div className="my-6">
      {data.map(({ volume, chapters }) => (
        <Accordion key={v4()} sx={overrideAccordionStyles}>
          <AccordionSummary expandIcon={<MdExpandMore />}>
            <Typography variant="h6" className="line-clamp-1">
              Volume {volume}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {chapters.map((chapter) => {
              return (
                <Link to={getComicReadingRoute(comictitle, chapter.chapter)} key={chapter.id}>
                  <ChapterFigure key={chapter.id} chapter={chapter} />
                </Link>
              );
            })}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default ComicPageChapterList;
