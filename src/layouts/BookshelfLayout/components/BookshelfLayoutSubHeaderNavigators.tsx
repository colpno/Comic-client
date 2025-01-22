import { Box } from '@mui/material';
import { useMemo } from 'react';
import { v4 } from 'uuid';

import { Tab, Tabs } from '~/components/index.ts';
import { getNavigation } from '../bookshelfLayoutConstants.ts';

const navigationItems = getNavigation();

function BookshelfLayoutSubHeaderNavigators() {
  const navigationRoutes = useMemo(() => navigationItems.map((i) => i.href), [navigationItems]);

  return (
    <Box sx={{ maxWidth: { xs: 100, sm: 270, md: 370 } }}>
      <Tabs
        as="links"
        routes={navigationRoutes}
        TabIndicatorProps={{ sx: { display: 'none' } }}
        sx={{
          '& .Mui-selected': {
            fontWeight: 600,
            color: 'var(--primary-600) !important',
          },
          '& *:not(.Mui-selected)': {
            color: 'var(--text-disabled) !important',
          },
        }}
      >
        {navigationItems.map((item) => (
          <Tab key={v4()} label={item.label} value={item.href} />
        ))}
      </Tabs>
    </Box>
  );
}

export default BookshelfLayoutSubHeaderNavigators;
