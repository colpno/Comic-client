import { MdOutlineSearch } from 'react-icons/md';
import { PiBooks } from 'react-icons/pi';
import { Link } from 'react-router-dom';

import { Button } from '~/components/index.ts';
import { ROUTE_LIBRARY } from '~/constants/routeConstants';
import HeaderAccountButton from './HeaderAccountButton';

function HeaderActions() {
  return (
    <div>
      <Button as="iconButton" color="inherit" title="Search">
        <MdOutlineSearch />
      </Button>
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
