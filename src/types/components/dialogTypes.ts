import { DialogProps as MUIDialogProps } from '@mui/material';

import { Typography } from '~/components/index.ts';
import { ButtonAsButtonProps } from '~/types/index.ts';

interface BaseProps extends Omit<MUIDialogProps, 'onClose'> {
  onClose?: () => void;
}

export interface DialogAsContainer extends BaseProps {
  variant: 'container';
}

export interface DialogAsConfirm extends Omit<BaseProps, 'title' | 'slotProps'> {
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

export type DialogProps = DialogAsContainer | DialogAsConfirm;
