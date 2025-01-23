import { Container } from '@mui/material';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { GoQuestion } from 'react-icons/go';
import { useSelector } from 'react-redux';

import { Button, Dialog } from '~/components/index.ts';
import Typography from '~/components/Typography.tsx';
import { MUI_CONTAINER_MAX_WIDTH } from '~/constants/commonConstants.ts';
import { removeReadingHistory } from '~/libs/redux/slices/commonSlice.ts';
import { RootState, useAppDispatch } from '~/libs/redux/store.ts';
import Table from './components/HistoryPageTable';

function HistoryPage() {
  const dispatch = useAppDispatch();
  const readingHistory = useSelector((state: RootState) => state.common.read);
  const [openWarning, setOpenWarning] = useState(false);

  const handleRemove = (id: string | string[]) => {
    try {
      dispatch(removeReadingHistory(id));
      return true;
    } catch (error) {
      return false;
    }
  };

  const toggleShowSavedHistoryWarning = () => {
    setOpenWarning((prev) => !prev);
  };

  return (
    <Container maxWidth={MUI_CONTAINER_MAX_WIDTH} className="pt-8" component="section">
      <div className="flex items-center mb-4">
        <Typography variant="h4">History</Typography>
        <Button as="iconButton" onClick={toggleShowSavedHistoryWarning}>
          <GoQuestion />
        </Button>
        <Dialog title="Saved History" open={openWarning} onClose={toggleShowSavedHistoryWarning}>
          <Typography>
            - Saved history is stored in your browser's local storage. If you clear your browser's
            local storage, your saved history will be lost.
          </Typography>
          <Typography>
            - You can export your data by using the "EXPORT" button. And currently, there is no way
            to import yet.
          </Typography>
        </Dialog>
      </div>
      <Table data={readingHistory} onRemove={handleRemove} />
      <Helmet>
        <title>Reading history - Comic</title>
      </Helmet>
    </Container>
  );
}

export default HistoryPage;
