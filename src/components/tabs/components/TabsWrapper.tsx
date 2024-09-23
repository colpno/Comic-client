import { TabsProps } from '@mui/material';

import { Device } from '~/hooks/useDeviceWatcher.ts';

export interface TabsWrapperProps extends TabsProps {
  device: Device;
}

function TabsWrapper({ children, device, centered }: TabsWrapperProps) {
  if (device !== 'mobile' && centered) {
    return <div className="flex items-center justify-center">{children}</div>;
  }

  return children;
}

export default TabsWrapper;
