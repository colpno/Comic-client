import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { MdExpandMore } from 'react-icons/md';
import { v4 } from 'uuid';

import { Typography } from '~/components/index.ts';
import { Chapter } from '~/types/index.ts';
import ComicPageChapterList from './ComicPageChapterList.tsx';

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

function ComicPageVolList({ data }: Props) {
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
            <ComicPageChapterList data={chapters} />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default ComicPageVolList;
