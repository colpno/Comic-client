import { Popover, PopoverProps } from '@mui/material';
import { memo } from 'react';

const position: Exclude<PopoverProps['anchorOrigin'], undefined> = {
  vertical: 'bottom',
  horizontal: 'left',
};

interface Props extends Omit<PopoverProps, 'anchorEl' | 'anchorOrigin'> {
  /** The anchor element to attach the popup. */
  anchorEl: PopoverProps['anchorEl'];
  /** @inheritdoc PopoverProps['anchorOrigin'] */
  anchorOrigin?: Partial<PopoverProps['anchorOrigin']>;
}

function Popup({ anchorOrigin, ...props }: Props) {
  const pos = anchorOrigin ? { ...position, ...anchorOrigin } : position;

  return <Popover {...props} anchorOrigin={pos} />;
}

export default memo(Popup);
