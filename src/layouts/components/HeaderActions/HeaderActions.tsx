import {
  CollectionsBookmarkOutlined,
  PermIdentityOutlined,
  SearchOutlined,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { Button } from '~/components/index.ts';
import { ROUTE_LIBRARY } from '~/constants/routes.ts';

function HeaderActions() {
  return (
    <div>
      <Button as="iconButton" title="Search">
        <SearchOutlined />
      </Button>
      <Link to={ROUTE_LIBRARY}>
        <Button as="iconButton" title="Library">
          <CollectionsBookmarkOutlined />
        </Button>
      </Link>
      <Button as="iconButton" title="Account">
        <PermIdentityOutlined />
      </Button>
    </div>
  );
}

export default HeaderActions;
