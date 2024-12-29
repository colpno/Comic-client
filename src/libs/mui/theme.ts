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
        main: getCSSVariableValue('--primary-500'),
        dark: getCSSVariableValue('--primary-600'),
        '100': getCSSVariableValue('--primary-100'),
        '200': getCSSVariableValue('--primary-200'),
        '300': getCSSVariableValue('--primary-300'),
        '400': getCSSVariableValue('--primary-400'),
        '500': getCSSVariableValue('--primary-500'),
        '600': getCSSVariableValue('--primary-600'),
        '700': getCSSVariableValue('--primary-700'),
        '800': getCSSVariableValue('--primary-800'),
        '900': getCSSVariableValue('--primary-900'),
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
    components: {
      MuiTab: {
        styleOverrides: {
          root: {
            color: 'var(--text-primary)',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'var(--border-primary)',
              },
            },
          },
        },
      },
    },
  });
};
