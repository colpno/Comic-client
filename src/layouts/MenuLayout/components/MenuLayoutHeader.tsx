import { useMemo } from 'react';

import { useDeviceWatcher } from '~/hooks/index.ts';
import BaseHeader from '~/layouts/components/Header.tsx';
import { heights } from '~/utils/cssUtils.ts';
import Menu from './MenuLayoutHeaderMenu.tsx';
import SubMenu from './MenuLayoutHeaderSubMenu.tsx';

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
      <BaseHeader />
      <div className="fixed left-0 right-0 top-header md:top-header-md z-sub-header">
        <Menu />
        <SubMenu />
      </div>
    </div>
  );
}

export default MenuLayoutHeader;
