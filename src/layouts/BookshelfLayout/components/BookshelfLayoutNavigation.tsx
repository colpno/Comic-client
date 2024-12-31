import { Box, Container } from '@mui/material';
import { useMemo } from 'react';
import { v4 } from 'uuid';

import Image from '~/components/Image.tsx';
import { Tab, Tabs, Typography } from '~/components/index.ts';
import { MUI_CONTAINER_MAX_WIDTH } from '~/constants/commonConstants.ts';
import { books } from '~/images/index.ts';
import { getNavigation } from '../bookshelfLayoutConstants.ts';

const navigationItems = getNavigation();

function Navigation() {
  const navigationRoutes = useMemo(() => navigationItems.map((i) => i.href), [navigationItems]);

  return (
    <div className="border-b border-gray-300 dark:border-gray-700">
      <Container
        maxWidth={MUI_CONTAINER_MAX_WIDTH}
        className="flex items-center justify-between py-1"
      >
        <div className="flex items-center gap-6">
          <Image src={books} alt="Bookshelf logo" className="w-9" />
          <Typography fontSize={40} className="!font-semibold md:!text-xl">
            Bookshelf
          </Typography>
        </div>
        <Box sx={{ maxWidth: { xs: 270, sm: 370 } }}>
          <Tabs
            as="links"
            routes={navigationRoutes}
            TabIndicatorProps={{ sx: { display: 'none' } }}
            sx={{
              '& .Mui-selected': {
                fontWeight: 600,
                color: 'var(--primary-600) !important',
              },
            }}
          >
            {navigationItems.map((item) => (
              <Tab key={v4()} label={item.label} value={item.href} />
            ))}
          </Tabs>
        </Box>
      </Container>
    </div>
  );
}

export default Navigation;
