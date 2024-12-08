import { useMediaQuery, useTheme } from '@mui/material';
import { useCallback, useEffect } from 'react';

import { changeDevice } from '~/libs/redux/slices/common.ts';
import { useAppDispatch } from '~/libs/redux/store.ts';
import { Device } from '~/types/commonTypes.ts';

function DeviceWatcher() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isTabletScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const dispatchChangeDevice = useCallback(
    (device: Device) => {
      dispatch(changeDevice(device));
    },
    [dispatch]
  );

  useEffect(() => {
    if (isMobileScreen) {
      dispatchChangeDevice('mobile');
      return;
    }

    if (isTabletScreen) {
      dispatchChangeDevice('tablet');
      return;
    }

    dispatchChangeDevice('desktop');
  }, [dispatchChangeDevice, isMobileScreen, isTabletScreen]);

  return null;
}

export default DeviceWatcher;
