import { Tabs as MUITabs, TabsProps as MUITabsProps } from '@mui/material';
import { memo, SyntheticEvent, useState } from 'react';

import { useDeviceWatcher } from '~/hooks/useDeviceWatcher.ts';
import { Omit } from '~/types/common.ts';

export type TabsValue = false | number;

export interface TabsProps extends Omit<MUITabsProps, 'defaultValue' | 'onChange'> {
  defaultValue?: TabsValue;
  onChange?: (newValue: TabsValue) => void;
}

function Tabs({ children, defaultValue = 0, variant, centered, onChange, ...props }: TabsProps) {
  const [currentTabIndex, setCurrentTabIndex] =
    useState<Exclude<TabsProps['defaultValue'], undefined>>(defaultValue);
  const isMobile = useDeviceWatcher() === 'mobile';

  const handleChange = (_: SyntheticEvent, newValue: TabsValue) => {
    setCurrentTabIndex(newValue);
    onChange?.(newValue);
  };

  return (
    <MUITabs
      variant={variant ?? isMobile ? 'fullWidth' : 'scrollable'}
      centered={centered ?? !isMobile}
      role="tablist"
      {...props}
      value={currentTabIndex}
      onChange={handleChange}
    >
      {children}
    </MUITabs>
  );
}

export default memo(Tabs);
