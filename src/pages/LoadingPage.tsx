import { Backdrop, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

import { RootState } from '~/libs/redux/store.ts';

function LoadingPage() {
  const activeApiCalls = useSelector((state: RootState) => state.common.activeApiCalls);

  if (activeApiCalls === 0) return null;

  return (
    <Backdrop style={{ backdropFilter: 'blur(2px)' }} open={true}>
      <div className="relative flex items-center justify-center text-white rounded-full size-12 sm:size-16 md:size-24 lg:size-28">
        <CircularProgress color="inherit" />
        <span className="absolute size-full bg-gray-300 rounded-[inherit] opacity-60 animate-[loadingPulse_4s_ease-out_infinite_1s]" />
      </div>
    </Backdrop>
  );
}

export default LoadingPage;
