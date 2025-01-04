import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { ROUTE_LOGIN } from '~/constants/routeConstants.ts';
import { RootState } from '~/libs/redux/store.ts';

function ProtectedLayout() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    const href = `${ROUTE_LOGIN}?redirect=${window.location.pathname}`;
    return <Navigate to={href} />;
  }

  return <Outlet />;
}

export default ProtectedLayout;
