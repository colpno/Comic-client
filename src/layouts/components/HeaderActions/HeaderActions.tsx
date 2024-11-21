import { CollectionsBookmarkOutlined, SearchOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { Button } from '~/components/index.ts';
import { ROUTE_LIBRARY } from '~/constants/routeConstants';
import HeaderAccountButton from './HeaderAccountButton';

function HeaderActions() {
  return (
    <div>
      <Button as="iconButton" color="inherit" title="Search">
        <SearchOutlined />
      </Button>
      <Link to={ROUTE_LIBRARY}>
        <Button as="iconButton" color="inherit" title="Library">
          <CollectionsBookmarkOutlined />
        </Button>
      </Link>
      <HeaderAccountButton />
    </div>
  );
}

export default HeaderActions;
