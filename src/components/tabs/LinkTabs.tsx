import { Tabs as MUITabs, TabsProps as MUITabsProps } from '@mui/material';
import { memo } from 'react';

import { useDeviceWatcher } from '~/hooks/useDeviceWatcher.ts';
import { useRouteMatch } from '~/hooks/useRouteMatch.ts';

export interface LinkTabsProps extends MUITabsProps {
  /** @example ['/users/add', '/users/edit', '/users'] */
  routes: string[];
}

function LinkTabs({ routes, children, variant, centered, ...props }: LinkTabsProps) {
  const currentTab = useRouteMatch(routes.sort((a, b) => b.localeCompare(a)));
  const isMobile = useDeviceWatcher() === 'mobile';

  return (
    <MUITabs
      variant={variant ?? isMobile ? 'fullWidth' : 'scrollable'}
      centered={centered ?? !isMobile}
      role="navigation"
      {...props}
      value={currentTab}
    >
      {children}
    </MUITabs>
  );
}

export default memo(LinkTabs);
