import {
  ButtonProps as MUIButtonProps,
  IconButtonProps as MUIIconButtonProps,
  IconButtonTypeMap,
} from '@mui/material';

type AssignProps<T, P> = P & Omit<T, keyof P>;
type BaseProps = {
  loading?: boolean;
  disableTextTransform?: boolean;
  externalLink?: boolean;
};

export type ButtonAsButtonProps = {
  as?: 'button';
} & AssignProps<MUIButtonProps, BaseProps>;

export type ButtonAsIconButtonProps<
  D extends React.ElementType = IconButtonTypeMap['defaultComponent']
> = {
  as: 'iconButton';
  children: JSX.Element;
  href?: string;
} & AssignProps<Omit<MUIIconButtonProps<D>, 'children'>, BaseProps>;

export type ButtonAsUnstyledProps = {
  as: 'unstyled';
} & AssignProps<React.ButtonHTMLAttributes<HTMLButtonElement>, BaseProps> &
  React.HTMLProps<HTMLButtonElement>;

export type ButtonProps = ButtonAsButtonProps | ButtonAsIconButtonProps | ButtonAsUnstyledProps;
