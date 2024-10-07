import { createTheme } from '@mui/material';
import { viVN } from '@mui/material/locale';
import { viVN as dataGridViVN } from '@mui/x-data-grid/locales';
import { viVN as pickerViVN } from '@mui/x-date-pickers/locales';

export const theme = createTheme(
  {
    palette: {
      primary: {
        main: '#f50000',
      },
      background: {
        default: '#fff',
      },
    },
  },
  viVN,
  dataGridViVN,
  pickerViVN
);
