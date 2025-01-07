import { Container } from '@mui/material';
import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';

import Typography from '~/components/Typography.tsx';
import { MUI_CONTAINER_MAX_WIDTH } from '~/constants/commonConstants.ts';
import { generateHistories } from '~/database/history.ts';
import { Chapter } from '~/types/chapterType.ts';
import { Comic } from '~/types/comicType.ts';
import { History } from '~/types/historyType.ts';
import Table from './components/HistoryPageTable';

const histories = generateHistories(3, { includeComic: true, includeChapter: true }) as History<
  Comic,
  Chapter
>[];

function HistoryPage() {
  const tableData = useMemo(
    () =>
      histories.map((history) => ({
        id: history.id,
        readAt: new Date(history.readAt),
        comic: history.comic,
        chapter: history.chapter,
      })),
    []
  );

  return (
    <Container maxWidth={MUI_CONTAINER_MAX_WIDTH} className="pt-8" component="section">
      <Typography variant="h4" className="!mb-4">
        History
      </Typography>
      <Table data={tableData} />
      <Helmet>
        <title>Reading history - Comic</title>
      </Helmet>
    </Container>
  );
}

export default HistoryPage;
