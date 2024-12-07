import { Container } from '@mui/material';
import { useMemo, useState } from 'react';
import { v4 } from 'uuid';

import { Tab, Tabs } from '~/components/index.ts';
import { MUI_CONTAINER_MAX_WIDTH } from '~/constants/commonConstants.ts';
import { ROUTE_DAILY_COMIC, ROUTE_RANKING } from '~/constants/routeConstants.ts';
import { useDeviceWatcher } from '~/hooks/useDeviceWatcher.ts';
import { useScroll } from '~/hooks/useScroll.ts';
import AppHeader from '~/layouts/components/Header.tsx';
import { heights } from '~/utils/cssUtils.ts';

const subMenu = [
  {
    title: 'Daily',
    link: ROUTE_DAILY_COMIC,
  },
  {
    title: 'Ranking',
    link: ROUTE_RANKING,
  },
];

const categoryMenu = [
  {
    title: 'All',
    link: '/ranking?category=all',
  },
  {
    title: 'Action',
    link: '/ranking?category=action',
  },
  {
    title: 'Adventure',
    link: '/ranking?category=adventure',
  },
  {
    title: 'Comedy',
    link: '/ranking?category=comedy',
  },
  {
    title: 'Drama',
    link: '/ranking?category=drama',
  },
  {
    title: 'Fantasy',
    link: '/ranking?category=fantasy',
  },
  {
    title: 'Horror',
    link: '/ranking?category=horror',
  },
  {
    title: 'Romance',
    link: '/ranking?category=romance',
  },
  {
    title: 'Sci-fi',
    link: '/ranking?category=sci-fi',
  },
  {
    title: 'Slice of Life',
    link: '/ranking?category=slice-of-life',
  },
  {
    title: 'Supernatural',
    link: '/ranking?category=supernatural',
  },
];

function SubMenus() {
  const [subMenuDisplay, setSubMenuDisplay] = useState(true);

  useScroll(() => (window.scrollY > 100 ? setSubMenuDisplay(false) : setSubMenuDisplay(true)));

  return (
    <div className="fixed left-0 right-0 top-header md:top-header-md z-header">
      {subMenuDisplay && (
        <div className="border-b h-menu-layout-sub-menu bg-main">
          <Container maxWidth={MUI_CONTAINER_MAX_WIDTH} component="nav">
            <Tabs
              routes={subMenu.map((item) => item.link)}
              centered
              sx={{
                '& .MuiTabs-scrollButtons svg': {
                  fontSize: '1.6em',
                },
                '& .MuiTabs-scrollButtons.Mui-disabled': {
                  opacity: 0.3,
                },
              }}
            >
              {subMenu.map((item) => (
                <Tab
                  label={item.title}
                  to={item.link}
                  value={item.link}
                  className="!text-lg !font-bold"
                  key={v4()}
                />
              ))}
            </Tabs>
          </Container>
        </div>
      )}
      <div className="border-b h-menu-layout-category-menu bg-main">
        <Container maxWidth={MUI_CONTAINER_MAX_WIDTH} component="nav">
          <Tabs
            routes={categoryMenu.map((item) => item.link)}
            scrollButtons
            centered
            exactMatch
            TabIndicatorProps={{ style: { display: 'none' } }}
            sx={{
              '& .Mui-selected': {
                color: 'var(--text-primary)',
                fontWeight: 500,
              },
              '& .MuiTab-root:not(.Mui-selected)': {
                color: 'var(--text-disabled)',
              },
              '& .MuiTabs-scrollButtons svg': {
                fontSize: '1.6em',
              },
              '& .MuiTabs-scrollButtons.Mui-disabled': {
                opacity: 0.3,
              },
            }}
          >
            {categoryMenu.map((item) => (
              <Tab label={item.title} to={item.link} value={item.link} key={v4()} />
            ))}
          </Tabs>
        </Container>
      </div>
    </div>
  );
}

const parseHeight = (height: string): number => parseInt(height, 10);

function MenuLayoutHeader() {
  const notDesktop = useDeviceWatcher() !== 'desktop';

  const headerHeight = useMemo(() => {
    const headersHeight = [
      notDesktop ? parseHeight(heights.header) : parseHeight(heights['header-md']),
      parseHeight(heights['menu-layout-sub-menu']),
      parseHeight(heights['menu-layout-category-menu']),
    ];

    return `${headersHeight.reduce((sum, h) => (sum += h), 0)}px`;
  }, [notDesktop]);

  return (
    <div style={{ height: headerHeight }}>
      <AppHeader />
      <SubMenus />
    </div>
  );
}

export default MenuLayoutHeader;
