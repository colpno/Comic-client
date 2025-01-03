import { Popover, PopoverProps } from '@mui/material';
import { memo } from 'react';

const position: PopoverProps['anchorOrigin'] = {
  vertical: 'bottom',
  horizontal: 'left',
};

interface Props extends Omit<PopoverProps, 'anchorEl'> {
  /** The anchor element to attach the popup. */
  anchorEl: PopoverProps['anchorEl'];
}

function Popup({ anchorOrigin = position, ...props }: Props) {
  return <Popover {...props} anchorOrigin={anchorOrigin} />;
}

export default memo(Popup);
