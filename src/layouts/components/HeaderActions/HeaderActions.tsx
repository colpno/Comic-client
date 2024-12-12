import { PiBooks } from 'react-icons/pi';
import { Link } from 'react-router-dom';

import { Button } from '~/components/index.ts';
import { ROUTE_LIBRARY } from '~/constants/routeConstants';
import HeaderAccountButton from './HeaderAccountButton';
import HeaderSearchButton from './HeaderSearchButton';

function HeaderActions() {
  return (
    <div>
      <HeaderSearchButton />
      <Link to={ROUTE_LIBRARY}>
        <Button as="iconButton" color="inherit" title="Library">
          <PiBooks />
        </Button>
      </Link>
      <HeaderAccountButton />
    </div>
  );
}

export default HeaderActions;
