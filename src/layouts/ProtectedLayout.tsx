import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { ROUTE_LOGIN } from '~/constants/routeConstants.ts';
import { RootState } from '~/libs/redux/store.ts';

function ProtectedLayout() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const { pathname } = useLocation();

  if (!isLoggedIn) {
    const href = `${ROUTE_LOGIN}?redirect=${pathname}`;
    return <Navigate to={href} />;
  }

  return <Outlet />;
}

export default ProtectedLayout;
