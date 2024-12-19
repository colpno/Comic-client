import { faker } from '@faker-js/faker';
import { Container } from '@mui/material';
import { useEffect, useState } from 'react';

import TextInput from '~/components/form-controls/base-controls/TextInput.tsx';
import { Button, Popup } from '~/components/index.ts';
import { MUI_CONTAINER_MAX_WIDTH } from '~/constants/commonConstants.ts';
import { generateHistories } from '~/database/history.ts';
import {
  HistoryComicCard,
  SelectiveFilterForm,
  SelectiveFilterFormValues,
} from '~/features/index.ts';
import { useDebounce } from '~/hooks/useDebounce.ts';
import { usePopup } from '~/hooks/usePopup.ts';
import { Chapter } from '~/types/chapterType.ts';
import { Comic } from '~/types/comicType.ts';
import { History } from '~/types/historyType.ts';

const histories = generateHistories(1, { includeComic: true, includeChapter: true }) as History<
  Comic,
  Chapter
>[];

function HistoryPage() {
  const [searchText, setSearchText] = useState('');
  const debouncedValue = useDebounce(searchText, 200);

  const handleRemoveCard = () => {
    // TODO: Implement remove a history
  };

  useEffect(() => {
    // TODO: Implement search
  }, [debouncedValue]);

  return (
    <Container maxWidth={MUI_CONTAINER_MAX_WIDTH} className="pt-12">
      <div className="flex flex-col justify-between mb-4 sm:items-center sm:flex-row">
        <div className="flex items-center">
          <TagFilterButton />
        </div>
        <TextInput
          value={searchText}
          onChange={setSearchText}
          name="historySearch"
          label="Search"
          size="small"
          variant="standard"
          slotProps={{ input: { className: '!rounded-2xl' } }}
        />
      </div>
      <section className="space-y-6 sm:space-y-4">
        {histories.map((history) => (
          <HistoryComicCard key={history.id} history={history} onRemove={handleRemoveCard} />
        ))}
      </section>
    </Container>
  );
}

export default HistoryPage;

const tags = Array.from({ length: 20 }, () => ({
  label: faker.lorem.word(),
  value: faker.lorem.word(),
}));

function TagFilterButton() {
  const { closePopup, open, openPopup, popupRef } = usePopup();

  const handleFormSubmit = (values: SelectiveFilterFormValues) => {
    // TODO: Implement filter
  };

  return (
    <div>
      <Button size="small" className="!bg-red-300 !text-black" onClick={openPopup}>
        Tags
      </Button>
      <Popup open={open} onClose={closePopup} anchorEl={popupRef}>
        <div className="w-64 p-4 bg-main">
          <SelectiveFilterForm title="Tags" onSubmit={handleFormSubmit} options={tags} />
        </div>
      </Popup>
    </div>
  );
}
