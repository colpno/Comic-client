import { Container, ContainerProps, Theme, useTheme } from '@mui/material';
import { HTMLAttributes, memo } from 'react';

import { MUI_CONTAINER_MAX_WIDTH } from '~/constants/commonConstants.ts';
import { useDeviceWatcher } from '~/hooks/index.ts';
import { Device } from '~/types/index.ts';
import { cn } from '~/utils/cssUtils.ts';
import HeaderActions from './HeaderActions/HeaderActions.tsx';
import HeaderLogo from './HeaderLogo.tsx';

interface FunctionalChildrenProps {
  device: Device;
  isMobile: boolean;
  theme: Theme;
}

interface Props {
  children?: React.ReactNode | ((props: FunctionalChildrenProps) => React.ReactNode);
  slotProps?: {
    header?: HTMLAttributes<HTMLElement>;
    container?: ContainerProps;
  };
}

function Header({ slotProps, children }: Props) {
  const device = useDeviceWatcher();
  const isMobile = device === 'mobile';
  const theme = useTheme();

  const renderChildren = () => {
    if (typeof children === 'function') {
      return children({ device: device ?? 'desktop', isMobile, theme });
    }

    if (children) {
      return children;
    }

    return (
      <>
        <HeaderLogo />
        <HeaderActions />
      </>
    );
  };

  return (
    <header
      {...slotProps?.header}
      className={cn(
        'fixed top-0 left-0 right-0 z-header bg-main border-b dark:border-gray-800',
        slotProps?.header?.className
      )}
    >
      <Container
        maxWidth={MUI_CONTAINER_MAX_WIDTH}
        {...slotProps?.container}
        className={cn(
          'flex items-center justify-between h-header md:h-header-md',
          slotProps?.container?.className
        )}
      >
        {renderChildren()}
      </Container>
    </header>
  );
}

export default memo(Header);
