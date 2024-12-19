import { Popover, PopoverProps } from '@mui/material';
import { memo } from 'react';

const position: PopoverProps['anchorOrigin'] = {
  vertical: 'bottom',
  horizontal: 'left',
};

function Popup({ anchorOrigin = position, ...props }: PopoverProps) {
  return <Popover {...props} anchorOrigin={anchorOrigin} />;
}

export default memo(Popup);
