import { createTheme } from '@mui/material';

const getCSSVariableValue = (variable: string) => {
  return getComputedStyle(document.body).getPropertyValue(variable);
};

type Mode = 'light' | 'dark';

export const getTheme = (mode: Mode) => {
  return createTheme({
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
  });
};
