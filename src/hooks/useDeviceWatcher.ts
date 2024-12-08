import { useSelector } from 'react-redux';

import { RootState } from '~/libs/redux/store.ts';
import { Device } from '~/types/commonTypes.ts';

export const useDeviceWatcher = (): Device | null => {
  const device = useSelector((state: RootState) => state.common.device);
  return device;
};
