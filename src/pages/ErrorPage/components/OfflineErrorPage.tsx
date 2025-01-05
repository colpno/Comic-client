import { Helmet } from 'react-helmet';

import { Image, Typography } from '~/components/index.ts';
import { noConnectionSVG } from '~/images/index.ts';

function OfflineErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 h-dvh">
      <Image src={noConnectionSVG} alt="No connection" />
      <Typography variant="h5">You are offline. Please check your internet connection.</Typography>
      <Helmet>
        <title>Comic</title>
      </Helmet>
    </div>
  );
}

export default OfflineErrorPage;
