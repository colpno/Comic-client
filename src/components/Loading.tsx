import { Backdrop, CircularProgress } from '@mui/material';

function Loading() {
  return (
    <Backdrop className="backdrop-blur-[2px], z-loading" open={true}>
      <div className="relative flex items-center justify-center text-white rounded-full size-12 sm:size-16 md:size-24 lg:size-28">
        <CircularProgress color="inherit" />
      </div>
    </Backdrop>
  );
}

export default Loading;
