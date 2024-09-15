import { Tabs as MUITabs, TabsProps as MUITabsProps } from '@mui/material';
import { memo } from 'react';

import { useRouteMatch } from '~/hooks/useRouteMatch.ts';

export interface LinkTabsProps extends MUITabsProps {
  /** should be sorted in descending. @example ['/users/add', '/users/edit', '/users'] */
  routes: string[];
}

function LinkTabs({ routes, children, ...props }: LinkTabsProps) {
  const currentTab = useRouteMatch(routes) ?? false;

  return (
    <MUITabs role="navigation" {...props} value={currentTab}>
      {children}
    </MUITabs>
  );
}

export default memo(LinkTabs);
