import {
  CollectionsBookmarkOutlined,
  PermIdentityOutlined,
  SearchOutlined,
} from '@mui/icons-material';

import { Button } from '~/components/index.ts';

function HeaderActions() {
  return (
    <div>
      <Button as="iconButton" title="Search">
        <SearchOutlined />
      </Button>
      <Button as="iconButton" title="Bookmark list">
        <CollectionsBookmarkOutlined />
      </Button>
      <Button as="iconButton" title="Account">
        <PermIdentityOutlined />
      </Button>
    </div>
  );
}

export default HeaderActions;
