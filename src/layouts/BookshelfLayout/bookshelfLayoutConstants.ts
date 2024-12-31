import { ROUTE_FOLLOW, ROUTE_HISTORY } from '~/constants/routeConstants.ts';

export const getNavigation = () => [
  { label: 'Follow', href: ROUTE_FOLLOW },
  { label: 'History', href: ROUTE_HISTORY },
];
