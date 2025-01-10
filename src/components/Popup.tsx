import { Popover, PopoverProps } from '@mui/material';
import { memo } from 'react';

const defaultPosition: Exclude<PopoverProps['anchorOrigin'], undefined> = {
  vertical: 'bottom',
  horizontal: 'left',
};

interface Props extends Omit<PopoverProps, 'anchorEl' | 'anchorOrigin'> {
  /** The anchor element to attach the popup. */
  anchorEl: PopoverProps['anchorEl'];
  /** @inheritdoc PopoverProps['anchorOrigin'] */
  position?: Partial<PopoverProps['anchorOrigin']>;
}

function Popup({ position, open, ...props }: Props) {
  const anchorOrigin = position ? { ...defaultPosition, ...position } : defaultPosition;
  const transformOrigin: PopoverProps['transformOrigin'] = {
    vertical: anchorOrigin?.vertical
      ? anchorOrigin.vertical === 'bottom'
        ? 'top'
        : 'bottom'
      : 'top',
    horizontal: anchorOrigin?.horizontal || 'left',
  };

  return (
    <Popover
      {...props}
      open={props.anchorEl ? open : false}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
    />
  );
}

export default memo(Popup);
