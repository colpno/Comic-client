import { RouteObject } from 'react-router-dom';

import { ROUTE_HOME } from '~/constants/common.ts';
import { HomePage } from '~/pages/index.ts';

const publicRoutes: RouteObject = {
  children: [{ path: ROUTE_HOME, Component: HomePage }],
};

export default publicRoutes;
