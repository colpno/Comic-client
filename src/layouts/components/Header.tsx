import { Container, ContainerProps, useTheme } from '@mui/material';
import { HTMLAttributes, memo } from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import { Logo } from '~/components/index.ts';
import { useDeviceWatcher } from '~/hooks/index.ts';
import HeaderActions from './HeaderActions/HeaderActions.tsx';

interface Props {
  children?: React.ReactNode;
  slotProps?: {
    container?: HTMLAttributes<HTMLElement>;
    wrapper?: ContainerProps;
  };
}

function Header({ slotProps, children }: Props) {
  const isMobile = useDeviceWatcher() === 'mobile';
  const theme = useTheme();

  return (
    <header
      {...slotProps?.container}
      id="header"
      className={twMerge(
        'fixed top-0 left-0 right-0 z-header bg-primary',
        slotProps?.container?.className
      )}
    >
      <Container
        maxWidth="md"
        {...slotProps?.wrapper}
        className={twMerge(
          'flex items-center justify-between h-[60px] md:h-[80px]',
          slotProps?.wrapper?.className
        )}
      >
        {children ?? (
          <>
            <Link to="/">
              {isMobile ? (
                <Logo variant="small" fill={theme.palette.primary.main} />
              ) : (
                <Logo width={110} height={27} fill={theme.palette.primary.main} />
              )}
            </Link>
            <HeaderActions />
          </>
        )}
      </Container>
    </header>
  );
}

export default memo(Header);
