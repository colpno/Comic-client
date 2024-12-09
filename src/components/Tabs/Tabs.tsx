import { Tabs as MUITabs, TabsProps as MUITabsProps } from '@mui/material';
import { memo, SyntheticEvent, useState } from 'react';

import { Omit } from '~/types/commonTypes.ts';
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

export interface TabsAsLinkTabsProps extends Omit<LinkTabsProps, 'value' | 'onChange'> {
  value?: string;
  onChange?: (newValue: TabsValue) => void;
}

export type TabsProps = (TabsAsTabsProps | TabsAsLinkTabsProps) & BaseProps;

function Tabs({
  routes,
  children,
  variant: variantProp,
  value: valueProp,
  centered: centeredProp,
  onChange,
  ...props
}: TabsProps) {
  const [currentValue, setCurrentValue] = useState<string | TabsValue | undefined>(valueProp);
  const variant = variantProp ?? 'scrollable';
  const centered = centeredProp;

  const handleChange = (_: SyntheticEvent, newValue: TabsValue) => {
    setCurrentValue(newValue);
    (onChange as TabsAsTabsProps['onChange'])?.(newValue);
  };

  return (
    <TabsWrapper {...props} centered={centered}>
      {routes ? (
        <LinkTabs
          {...props}
          routes={routes}
          value={valueProp}
          centered={variant === 'scrollable' ? false : centered}
          variant={variant}
          onChange={handleChange}
        >
          {children}
        </LinkTabs>
      ) : (
        <MUITabs
          role="tablist"
          {...props}
          centered={variant === 'scrollable' ? false : centered}
          variant={variant}
          value={currentValue ?? 0}
          onChange={handleChange}
        >
          {children}
        </MUITabs>
      )}
    </TabsWrapper>
  );
}

export default memo(Tabs);
