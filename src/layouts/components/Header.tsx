import { Container, ContainerProps, Theme, useTheme } from '@mui/material';
import { HTMLAttributes, memo } from 'react';
import { Link } from 'react-router-dom';

import { Logo } from '~/components/index.ts';
import { useDeviceWatcher } from '~/hooks/index.ts';
import { Device } from '~/hooks/useDeviceWatcher.ts';
import { cn } from '~/utils/cssUtils.ts';
import HeaderActions from './HeaderActions/HeaderActions.tsx';

interface FunctionalChildrenProps {
  device: Device;
  isMobile: boolean;
  theme: Theme;
}

interface Props {
  children?: React.ReactNode | ((props: FunctionalChildrenProps) => React.ReactNode);
  slotProps?: {
    container?: HTMLAttributes<HTMLElement>;
    wrapper?: ContainerProps;
  };
}

function Header({ slotProps, children }: Props) {
  const device = useDeviceWatcher();
  const isMobile = device === 'mobile';
  const theme = useTheme();

  const renderChildren = () => {
    if (typeof children === 'function') {
      return children({ device, isMobile, theme });
    }

    if (children) {
      return children;
    }

    return (
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
    );
  };

  return (
    <header
      {...slotProps?.container}
      className={cn('fixed top-0 left-0 right-0 z-header bg-main', slotProps?.container?.className)}
    >
      <Container
        maxWidth="md"
        {...slotProps?.wrapper}
        className={cn(
          'flex items-center justify-between h-header md:h-header-md',
          slotProps?.wrapper?.className
        )}
      >
        {renderChildren()}
      </Container>
    </header>
  );
}

export default memo(Header);
