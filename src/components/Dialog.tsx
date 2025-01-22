import { Dialog as MUIDialog } from '@mui/material';
import { memo } from 'react';

import { useDeviceWatcher } from '~/hooks/useDeviceWatcher.ts';
import { DialogAsConfirm, DialogAsContainer, DialogProps } from '~/types/index.ts';
import { cn } from '~/utils/cssUtils.ts';
import { Button, Typography } from './index.ts';

function Dialog({ variant = 'confirm', ...props }: DialogProps) {
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
  const {
    title: titleProps,
    content: contentProps,
    actions: actionsProps,
    'actions.accept': actionsAcceptProps,
    'actions.close': actionsCloseProps,
    'actions.reject': actionsRejectProps,
    ...slotProps
  } = props.slotProps || {};

  return (
    <MUIDialog
      {...props}
      slotProps={slotProps}
      onClose={onClose}
      fullScreen={isMobile}
      className={cn('z-dialog', className)}
    >
      {overrideUI?.title || (
        <Typography
          {...titleProps}
          variant="h5"
          className={cn('p-3 border-b dark:border-gray-600 text-primary-500', classes?.title)}
        >
          {title}
        </Typography>
      )}
      <div
        {...contentProps}
        className={cn('px-6 overflow-y-auto shadow-inner py-9 text-main', classes?.content)}
      >
        {children}
      </div>
      <div
        {...actionsProps}
        className={cn('p-3 text-right border-t dark:border-gray-600 space-x-3', classes?.actions)}
      >
        {overrideUI?.actions || (
          <>
            {onAccept && (
              <Button {...actionsAcceptProps} onClick={onAccept}>
                Yes
              </Button>
            )}
            {onReject && (
              <Button {...actionsRejectProps} variant="outlined" onClick={onReject}>
                No
              </Button>
            )}
            {onClose && (
              <Button {...actionsCloseProps} variant="outlined" onClick={onClose}>
                Close
              </Button>
            )}
          </>
        )}
      </div>
    </MUIDialog>
  );
}
