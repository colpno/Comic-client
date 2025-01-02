import { PiBooks } from 'react-icons/pi';

import { Button } from '~/components/index.ts';
import { ROUTE_HISTORY } from '~/constants/routeConstants';
import AccountButton from './HeaderAccountButton';
import SearchButton from './HeaderSearchButton';
import ThemeButton from './HeaderThemeButton.tsx';

function HeaderActions() {
  return (
    <div className="flex">
      <SearchButton />
      <ThemeButton />
      <Button as="iconButton" href={ROUTE_HISTORY} color="inherit" title="History">
        <PiBooks />
      </Button>
      <AccountButton />
    </div>
  );
}

export default HeaderActions;
