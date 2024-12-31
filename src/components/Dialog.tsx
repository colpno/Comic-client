import { Dialog as MUIDialog, DialogProps as MUIDialogProps } from '@mui/material';
import { memo } from 'react';

import { useDeviceWatcher } from '~/hooks/useDeviceWatcher.ts';
import { ButtonAsButtonProps } from '~/types/formControlTypes.ts';
import { cn } from '~/utils/cssUtils.ts';
import { Button, Typography } from './index.ts';

interface BaseProps extends Omit<MUIDialogProps, 'onClose'> {
  onClose?: () => void;
}

interface DialogAsContainer extends BaseProps {
  variant: 'container';
}

interface DialogAsConfirm extends Omit<BaseProps, 'title' | 'slotProps'> {
  /** @default confirm */
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
  slotProps?: Omit<BaseProps['slotProps'], 'title' | 'content' | 'actions'> & {
    title?: React.ComponentProps<typeof Typography>;
    content?: React.HTMLAttributes<HTMLDivElement>;
    actions?: React.HTMLAttributes<HTMLDivElement>;
    'actions.accept'?: ButtonAsButtonProps;
    'actions.reject'?: ButtonAsButtonProps;
    'actions.close'?: ButtonAsButtonProps;
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
          className={cn('p-3 border-b text-primary-500', classes?.title)}
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
      <div {...actionsProps} className={cn('p-3 text-right border-t', classes?.actions)}>
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
