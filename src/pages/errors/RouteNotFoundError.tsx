import { ErrorResponse } from 'react-router-dom';

import Typography from '~/components/Typography.tsx';

interface Props {
  error: ErrorResponse;
}

function RouteNotFoundError({ error }: Props) {
  const { data, status, statusText } = error;

  return (
    <main>
      <Typography variant="h1">{status}</Typography>
      <Typography component="p">{statusText}</Typography>
      <Typography component="pre">{JSON.stringify(data, null, 2)}</Typography>
    </main>
  );
}

export default RouteNotFoundError;
