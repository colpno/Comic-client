import { Container } from '@mui/material';
import { PiBooks } from 'react-icons/pi';
import { Link, useSearchParams } from 'react-router-dom';

import { Button } from '~/components/index.ts';
import { MUI_CONTAINER_MAX_WIDTH } from '~/constants/commonConstants.ts';
import { ROUTE_LIBRARY } from '~/constants/routeConstants';
import HeaderAccountButton from '~/layouts/components/HeaderActions/HeaderAccountButton.tsx';
import HeaderLogo from '~/layouts/components/HeaderLogo.tsx';
import SearchInput from '~/layouts/components/SearchInput.tsx';

function SearchLayoutHeader() {
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get('value') || undefined; // undefined for prop typing

  return (
    <header className="fixed top-0 left-0 right-0 border-b z-header bg-main">
      <Container
        maxWidth={MUI_CONTAINER_MAX_WIDTH}
        className="flex items-center justify-between h-header md:h-header-md"
      >
        <HeaderLogo />
        <div className="flex-[0_1_26rem] px-4 sm:px-8">
          <SearchInput value={searchValue} replaceUrl />
        </div>
        <div>
          <Link to={ROUTE_LIBRARY}>
            <Button as="iconButton" color="inherit" title="Library">
              <PiBooks />
            </Button>
          </Link>
          <HeaderAccountButton />
        </div>
      </Container>
    </header>
  );
}

export default SearchLayoutHeader;
