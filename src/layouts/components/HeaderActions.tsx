import {
  CollectionsBookmarkOutlined,
  PermIdentityOutlined,
  SearchOutlined,
} from '@mui/icons-material';

import { Button } from '~/components/index.ts';

function HeaderActions() {
  return (
    <div>
      <Button as="iconButton">
        <SearchOutlined />
      </Button>
      <Button as="iconButton">
        <CollectionsBookmarkOutlined />
      </Button>
      <Button as="iconButton">
        <PermIdentityOutlined />
      </Button>
    </div>
  );
}

export default HeaderActions;
