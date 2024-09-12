import { useMediaQuery, useTheme } from '@mui/material';

type Device = 'mobile' | 'tablet' | 'desktop';

export const useDeviceWatcher = (): Device => {
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isTabletScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  if (isMobileScreen) return 'mobile';

  if (isTabletScreen) return 'tablet';

  return 'desktop';
};
