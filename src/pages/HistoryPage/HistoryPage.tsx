import { Container } from '@mui/material';
import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';

import Typography from '~/components/Typography.tsx';
import { MUI_CONTAINER_MAX_WIDTH } from '~/constants/commonConstants.ts';
import { removeReadingHistory } from '~/libs/redux/slices/commonSlice.ts';
import { RootState, useAppDispatch } from '~/libs/redux/store.ts';
import Table from './components/HistoryPageTable';

function HistoryPage() {
  const dispatch = useAppDispatch();
  const readingHistory = useSelector((state: RootState) => state.common.read);

  const tableData = useMemo(
    () =>
      readingHistory.map((history) => ({
        id: history.id,
        readAt: new Date(history.readAt),
        comic: history.comic,
        chapter: history.chapter,
      })),
    []
  );

  const handleRemove = (id: string | string[]) => {
    try {
      dispatch(removeReadingHistory(id));
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <Container maxWidth={MUI_CONTAINER_MAX_WIDTH} className="pt-8" component="section">
      <Typography variant="h4" className="!mb-4">
        History
      </Typography>
      <Table data={tableData} onRemove={handleRemove} />
      <Helmet>
        <title>Reading history - Comic</title>
      </Helmet>
    </Container>
  );
}

export default HistoryPage;
