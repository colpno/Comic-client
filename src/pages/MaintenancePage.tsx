import { Outlet } from 'react-router-dom';

import { usePingQuery } from '~/apis/nonResourcesApis.ts';
import { Image, Typography } from '~/components/index.ts';
import Loading from '~/components/Loading.tsx';
import { maintenancePNG } from '~/images/index.ts';

function MaintenancePage() {
  const { data, isFetching, isLoading, isSuccess } = usePingQuery();

  if (isFetching || isLoading || !isSuccess) {
    return <Loading />;
  }

  if (data?.status === 'maintenance') {
    return (
      <div className="flex flex-col items-center justify-center gap-3 bg-gray-800 h-dvh">
        <Image src={maintenancePNG} alt="Maintenance" className="w-1/4" />
        <div className="max-w-[600px] flex flex-col items-center justify-center gap-2">
          <Typography variant="h1" className="!text-4xl text-white">
            Site under maintenance!
          </Typography>
          <Typography className="text-center text-white">
            We are currently performing scheduled maintenance. We will be back shortly. Thank you
            for your patience.
          </Typography>
        </div>
      </div>
    );
  }

  return <Outlet />;
}

export default MaintenancePage;
