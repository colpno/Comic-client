import { createTheme } from '@mui/material';

const getCSSVariableValue = (variable: string) => {
  return getComputedStyle(document.body).getPropertyValue(variable);
};

type Mode = 'light' | 'dark';

export const getTheme = (mode: Mode) => {
  const theme = createTheme({
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

  theme.typography.h1 = {
    fontSize: '2.125rem',
    lineHeight: '2.5rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '2.875rem',
      lineHeight: '3.25rem',
    },
  };

  theme.typography.h2 = {
    fontSize: '1.875rem',
    lineHeight: '2.25rem',
    [theme.breakpoints.up('md')]: {
      fontSize: '2.25rem',
      lineHeight: '2.5rem',
    },
  };

  theme.typography.h4 = {
    fontSize: '1.5rem',
    lineHeight: '2rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.875rem',
      lineHeight: '2.25rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '2.25rem',
      lineHeight: '2.5rem',
    },
  };

  theme.typography.h5 = {
    fontSize: '1.125rem',
    lineHeight: '1.75rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.5rem',
      lineHeight: '2rem',
    },
  };

  theme.typography.body1 = {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  };

  theme.typography.body2 = {
    fontSize: '0.75rem',
    lineHeight: '1rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
    },
  };

  return theme;
};
