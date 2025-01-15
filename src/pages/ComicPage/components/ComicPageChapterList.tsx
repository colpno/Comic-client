import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { MdExpandMore } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 } from 'uuid';

import { Typography } from '~/components/index.ts';
import { getComicReadingRoute } from '~/constants/routeConstants.ts';
import { Chapter } from '~/types/chapterType.ts';
import ChapterFigure from './ComicPageChapterFigure.tsx';

type Volume = {
  volume: string;
  chapters: Chapter[];
};

function ComicPageChapterList({ chapters }: { chapters: Chapter[] }) {
  const { comictitle } = useParams();
  const [volumes, setVolumes] = useState<Volume[]>([]);

  // Group chapters by volume
  const groupedChapters = useMemo(
    () =>
      chapters.reduce((acc, chapter) => {
        const volume = chapter.volume || 'Other';
        if (!acc[volume]) {
          acc[volume] = [];
        }
        acc[volume].push(chapter);
        return acc;
      }, {} as Record<string, Chapter[]>),
    [chapters]
  );

  // Reverse the order of volumes
  useEffect(() => {
    const vols: typeof volumes = [];
    const volumeKeys = Object.keys(groupedChapters);

    for (let i = volumeKeys.length - 1; i >= 0; i--) {
      const volume = volumeKeys[i];
      const chapters = groupedChapters[volume];
      vols.push({ volume, chapters });
    }

    setVolumes(vols);
  }, [groupedChapters]);

  return (
    <div className="my-6">
      {volumes.map(({ volume, chapters }) => (
        <Accordion
          key={v4()}
          sx={{
            '&.MuiAccordion-root': {
              backgroundColor: 'transparent',
              boxShadow: 'none',
            },
          }}
        >
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
