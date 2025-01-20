import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { PROTECTED_ROUTES, ROUTE_HOME, ROUTE_LOGIN } from '~/constants/routeConstants.ts';
import { RootState } from '~/libs/redux/store.ts';

function ProtectedLayout() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const { pathname } = useLocation();

  if (!isLoggedIn) {
    if (PROTECTED_ROUTES.includes(pathname)) {
      return <Navigate to={ROUTE_HOME} />;
    }

    const href = `${ROUTE_LOGIN}?redirect=${pathname}`;
    return <Navigate to={href} />;
  }

  return <Outlet />;
}

export default ProtectedLayout;
