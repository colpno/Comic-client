import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

import OfflineError from './OfflineError.tsx';
import RouteNotFoundError from './RouteNotFoundError.tsx';
import UnknownError from './UnknownError.tsx';

interface Props {
  message?: string;
}

function ErrorPage({ message = '' }: Props) {
  const error = useRouteError();
  const navigator = window.navigator;

  if (isRouteErrorResponse(error)) return <RouteNotFoundError error={error} />;

  if (navigator.onLine === false) return <OfflineError />;

  return <UnknownError message={message} />;
}

export default ErrorPage;
