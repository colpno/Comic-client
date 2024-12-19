import { Dialog as MUIDialog, DialogProps as MUIDialogProps } from '@mui/material';
import { memo } from 'react';

import { useDeviceWatcher } from '~/hooks/useDeviceWatcher.ts';
import { cn } from '~/utils/cssUtils.ts';
import { Button, Typography } from './index.ts';

interface BaseProps extends Omit<MUIDialogProps, 'onClose'> {
  onClose?: () => void;
}

interface DialogAsContainer extends BaseProps {
  variant: 'container';
}

interface DialogAsConfirm extends Omit<BaseProps, 'title'> {
  variant?: 'confirm';
  title: string;
  onAccept?: () => void;
  onReject?: () => void;
  overrideUI?: {
    title?: React.ReactNode;
    actions?: React.ReactNode;
  };
  classes?: {
    root?: string;
    title?: string;
    content?: string;
    actions?: string;
  };
}

type Props = DialogAsContainer | DialogAsConfirm;

function Dialog({ variant = 'confirm', ...props }: Props) {
  switch (variant) {
    case 'confirm':
      return <ConfirmDialog {...(props as DialogAsConfirm)} />;
    case 'container':
    default:
      return <MUIDialog {...(props as DialogAsContainer)} />;
  }
}

export default memo(Dialog);

function ConfirmDialog({
  onClose,
  children,
  title,
  classes,
  overrideUI,
  onAccept,
  onReject,
  className,
  ...props
}: DialogAsConfirm) {
  const isMobile = useDeviceWatcher() === 'mobile';

  return (
    <MUIDialog
      {...props}
      onClose={onClose}
      fullScreen={isMobile}
      className={cn('z-dialog', className)}
    >
      <div className={cn('p-3 border-b text-primary', classes?.title)}>
        {overrideUI?.title || <Typography variant="h5">{title}</Typography>}
      </div>
      <div className={cn('px-6 overflow-y-auto shadow-inner py-9 text-main', classes?.content)}>
        {children}
      </div>
      <div className={cn('p-3 text-right border-t', classes?.actions)}>
        {overrideUI?.actions || (
          <>
            {onAccept && <Button onClick={onAccept}>Yes</Button>}
            {onReject && (
              <Button variant="outlined" onClick={onReject}>
                No
              </Button>
            )}
            {onClose && (
              <Button variant="outlined" onClick={onClose}>
                Close
              </Button>
            )}
          </>
        )}
      </div>
    </MUIDialog>
  );
}
