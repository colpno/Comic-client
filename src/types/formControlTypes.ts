import {
  ButtonProps as MUIButtonProps,
  IconButtonProps as MUIIconButtonProps,
  IconButtonTypeMap,
} from '@mui/material';
import { ButtonHTMLAttributes, HTMLProps } from 'react';

/* 
  Button
*/
type AssignProps<T, P> = P & Omit<T, keyof P>;
type BaseProps = {
  loading?: boolean;
  disableGutter?: boolean;
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
} & AssignProps<ButtonHTMLAttributes<HTMLButtonElement>, BaseProps> &
  HTMLProps<HTMLButtonElement>;

export type ButtonProps = ButtonAsButtonProps | ButtonAsIconButtonProps | ButtonAsUnstyledProps;

/* 
  Autocomplete
*/
export type AutocompleteOption = {
  groupByProperty?: string;
  label: string;
  value: string;
};

/*
  Checkbox
*/
export interface CheckboxOption {
  label: string;
  value: string;
}

/*
  Radio
*/
export interface RadioOption {
  label: string;
  value: string;
}
