import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

import NotFoundPage from './components/NotFoundPage.tsx';
import OfflineErrorPage from './components/OfflineErrorPage.tsx';
import UnknownErrorPage from './components/UnknownErrorPage.tsx';

interface Props {
  message?: string;
}

function ErrorPage({ message = '' }: Props) {
  const error = useRouteError();
  const { onLine } = window.navigator;

  if (isRouteErrorResponse(error)) return <NotFoundPage error={error} />;

  if (onLine === false) return <OfflineErrorPage />;

  return <UnknownErrorPage message={message} />;
}

export default ErrorPage;
