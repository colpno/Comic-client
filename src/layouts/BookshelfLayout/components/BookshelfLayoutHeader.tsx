import { Container, ContainerProps } from '@mui/material';
import { HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

import { Logo as AppLogo } from '~/components/index.ts';
import { MUI_CONTAINER_MAX_WIDTH } from '~/constants/commonConstants.ts';
import { ROUTE_HOME } from '~/constants/routeConstants.ts';
import { useDeviceWatcher } from '~/hooks/index.ts';
import HeaderActions from '~/layouts/components/HeaderActions/HeaderActions.tsx';
import { cn } from '~/utils/cssUtils.ts';

interface Props {
  slotProps?: {
    header?: HTMLAttributes<HTMLElement>;
    container?: ContainerProps;
  };
}

function BookshelfLayoutHeader({ slotProps }: Props) {
  return (
    <header
      {...slotProps?.header}
      className={cn(
        'fixed top-0 left-0 right-0 z-header bg-primary-500 border-b dark:border-gray-800',
        slotProps?.header?.className
      )}
    >
      <Container
        maxWidth={MUI_CONTAINER_MAX_WIDTH}
        {...slotProps?.container}
        className={cn(
          'flex items-center justify-between h-header md:h-header-md text-white',
          slotProps?.container?.className
        )}
      >
        <Logo />
        <HeaderActions />
      </Container>
    </header>
  );
}

export default BookshelfLayoutHeader;

function Logo() {
  const isMobile = useDeviceWatcher() === 'mobile';

  return (
    <Link to={ROUTE_HOME}>
      {isMobile ? (
        <AppLogo variant="small" fill="#fff" />
      ) : (
        <AppLogo width={110} height={27} fill="#fff" />
      )}
    </Link>
  );
}
