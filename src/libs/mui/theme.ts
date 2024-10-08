import { createTheme } from '@mui/material';
import { viVN } from '@mui/material/locale';
import { viVN as dataGridViVN } from '@mui/x-data-grid/locales';
import { viVN as pickerViVN } from '@mui/x-date-pickers/locales';

export const locales = [viVN, dataGridViVN, pickerViVN];

const getCSSVariableValue = (variable: string) => {
  return getComputedStyle(document.body).getPropertyValue(variable);
};

type Mode = 'light' | 'dark';

export const getTheme = (mode: Mode) => {
  return createTheme(
    {
      palette: {
        mode,
        primary: {
          main: getCSSVariableValue('--primary'),
        },
        text: {
          primary: getCSSVariableValue('--text-primary'),
          disabled: getCSSVariableValue('--text-disabled'),
        },
        background: {
          default: getCSSVariableValue('--background-primary'),
          paper: getCSSVariableValue('--background-secondary'),
        },
      },
    },
    locales
  );
};
