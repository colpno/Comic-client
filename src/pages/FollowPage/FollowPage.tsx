import { Container } from '@mui/material';
import { useState } from 'react';

import { Dialog } from '~/components/index.ts';
import { MUI_CONTAINER_MAX_WIDTH } from '~/constants/commonConstants.ts';
import { generateFollows } from '~/database/follow.ts';
import {
  SortButton,
  TagFilterButton,
  TagFilterFormValues,
  TitleFilterButton,
  TitleFilterFormValues,
} from '~/features/index.ts';
import { Comic } from '~/types/comicType.ts';
import { Follow } from '~/types/followType.ts';
import FollowPageFollowList from './components/FollowPageFollowList';

const follows = generateFollows(2, { includeComic: true }) as Follow<Comic>[];

function FollowPage() {
  const [followIdToRemove, setFollowIdToRemove] = useState('');

  const openRemovalPopup = (followId: string) => setFollowIdToRemove(followId);
  const closeRemovalPopup = () => setFollowIdToRemove('');

  const handleRemoveFollow = () => {
    // TODO: Implement remove a follow
    console.log('followIdToRemove:', followIdToRemove);

    // closeRemovalPopup();
  };

  const handleTitleFilterFormSubmit = (values: TitleFilterFormValues) => {
    // TODO: Implement filter
    console.log('values:', values);
  };

  const handleTagFilterFormSubmit = (values: TagFilterFormValues) => {
    // TODO: Implement filter
    console.log('values:', values);
  };

  const handleSortOrderChange = (isAsc: boolean) => {
    // TODO: Implement sort
    console.log('order:', isAsc);
  };

  return (
    <>
      <Container maxWidth={MUI_CONTAINER_MAX_WIDTH} className="pt-12">
        {follows.length > 0 && (
          <div className="flex flex-row items-center mb-4 sm:justify-between">
            <div className="flex gap-1.5">
              <TitleFilterButton onSubmit={handleTitleFilterFormSubmit} />
              <TagFilterButton onSubmit={handleTagFilterFormSubmit} />
            </div>
            <SortButton onChange={handleSortOrderChange} className="!ml-2 sm:!ml-0" />
          </div>
        )}
        <FollowPageFollowList items={follows} onRemoveClick={openRemovalPopup} />
      </Container>
      <Dialog
        open={!!followIdToRemove}
        onAccept={handleRemoveFollow}
        onClose={closeRemovalPopup}
        title="Remove Follow"
        maxWidth="xs"
        fullWidth
      >
        Are you sure to remove this follow?
      </Dialog>
    </>
  );
}

export default FollowPage;
