import { useTheme } from '@mui/material';

import { Tab, Tabs } from '~/components/index.ts';

interface Props {
  onChange: (value: number) => void;
}

function Navigation({ onChange }: Props) {
  const theme = useTheme();

  return (
    <Tabs
      className="flex items-center gap-1 px-2 shadow-inner rounded-xl bg-sub"
      TabIndicatorProps={{ style: { display: 'none' } }}
      scrollButtons={false}
      onChange={(value) => onChange(value as number)}
      sx={{
        '& .Mui-selected': {
          color: '#000',
          background: theme.palette.background.default,
          borderRadius: '5px',
          boxShadow: '0 0 5px 1px rgba(0, 0, 0, 0.1)',
        },
        '& .MuiTab-root': {
          paddingY: '0.5rem !important',
          textTransform: 'capitalize',
          minHeight: 'unset !important',
          flex: 1,
        },
      }}
    >
      <Tab label="Include" />
      <Tab label="Exclude" />
    </Tabs>
  );
}

export default Navigation;
