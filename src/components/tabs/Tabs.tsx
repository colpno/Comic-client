import { Tabs as MUITabs, TabsProps as MUITabsProps } from '@mui/material';
import { memo, SyntheticEvent, useState } from 'react';

import { useDeviceWatcher } from '~/hooks/useDeviceWatcher.ts';
import { Omit } from '~/types/common.ts';
import LinkTabs, { LinkTabsProps } from './components/LinkTabs.tsx';
import TabsWrapper from './components/TabsWrapper.tsx';

export type TabsValue = false | number;

interface BaseProps {
  children: React.ReactNode;
}

export interface TabsAsTabsProps extends Omit<MUITabsProps, 'defaultValue' | 'onChange' | 'value'> {
  value?: TabsValue;
  onChange?: (newValue: TabsValue) => void;
  routes?: never;
}

export type TabsProps = (TabsAsTabsProps | LinkTabsProps) & BaseProps;

function Tabs({
  routes,
  children,
  variant: variantProp,
  value: valueProp,
  centered: centeredProp,
  onChange,
  ...props
}: TabsProps) {
  const [currentValue, setCurrentValue] = useState<Exclude<TabsAsTabsProps['value'], undefined>>(
    valueProp ?? 0
  );
  const device = useDeviceWatcher();
  const isMobile = device === 'mobile';
  const variant = variantProp ?? isMobile ? 'fullWidth' : 'scrollable';
  const centered = centeredProp && !isMobile ? false : centeredProp;

  const handleChange = (_: SyntheticEvent, newValue: TabsValue) => {
    setCurrentValue(newValue);
    (onChange as TabsAsTabsProps['onChange'])?.(newValue);
  };

  return (
    <TabsWrapper device={device} {...props} centered={centered}>
      {routes ? (
        <LinkTabs
          {...props}
          routes={routes}
          value={valueProp}
          centered={centered}
          variant={variant}
        >
          {children}
        </LinkTabs>
      ) : (
        <MUITabs
          role="tablist"
          {...props}
          centered={centered}
          variant={variant}
          value={currentValue}
          onChange={handleChange}
        >
          {children}
        </MUITabs>
      )}
    </TabsWrapper>
  );
}

export default memo(Tabs);
