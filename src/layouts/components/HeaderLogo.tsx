import { useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

import { Logo } from '~/components/index.ts';
import { ROUTE_HOME } from '~/constants/routeConstants.ts';
import { useDeviceWatcher } from '~/hooks/index.ts';

function HeaderLogo() {
  const isMobile = useDeviceWatcher() === 'mobile';
  const theme = useTheme();

  return (
    <Link to={ROUTE_HOME}>
      {isMobile ? (
        <Logo variant="small" fill={theme.palette.primary.main} />
      ) : (
        <Logo width={110} height={27} fill={theme.palette.primary.main} />
      )}
    </Link>
  );
}

export default HeaderLogo;
