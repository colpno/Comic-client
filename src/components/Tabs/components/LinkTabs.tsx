import { Tabs as MUITabs, TabsProps as MUITabsProps } from '@mui/material';
import { memo } from 'react';

import { useRouteMatch } from '~/hooks/index.ts';

export interface LinkTabsProps extends MUITabsProps {
  /** should be sorted in descending. @example ['/users/add', '/users/edit', '/users'] */
  routes: string[];
  /** Match pathname including params. */
  matchParams?: boolean;
}

function LinkTabs({ routes, children, matchParams, ...props }: LinkTabsProps) {
  const currentTab = useRouteMatch(routes, { matchParams: matchParams }) ?? false;

  return (
    <MUITabs role="navigation" {...props} value={currentTab}>
      {children}
    </MUITabs>
  );
}

export default memo(LinkTabs);
