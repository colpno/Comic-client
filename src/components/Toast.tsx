import { useTheme } from '@mui/material';
import { memo } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function Toast() {
  const theme = useTheme().palette.mode;

  return (
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      closeOnClick
      draggable={false}
      pauseOnHover
      pauseOnFocusLoss
      rtl={false}
      theme={theme}
    />
  );
}

export default memo(Toast);
