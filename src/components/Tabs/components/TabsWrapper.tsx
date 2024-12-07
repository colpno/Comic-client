import { TabsProps } from '@mui/material';

function TabsWrapper({ children, centered }: TabsProps) {
  if (centered) {
    return <div className="flex items-center justify-center">{children}</div>;
  }

  return children;
}

export default TabsWrapper;
