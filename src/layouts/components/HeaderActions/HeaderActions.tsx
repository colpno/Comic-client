import { PiBooks } from 'react-icons/pi';

import { Button } from '~/components/index.ts';
import { ROUTE_HISTORY } from '~/constants/routeConstants';
import HeaderAccountButton from './HeaderAccountButton';
import HeaderSearchButton from './HeaderSearchButton';

function HeaderActions() {
  return (
    <div className="flex">
      <HeaderSearchButton />
      <Button as="iconButton" href={ROUTE_HISTORY} color="inherit" title="History">
        <PiBooks />
      </Button>
      <HeaderAccountButton />
    </div>
  );
}

export default HeaderActions;
