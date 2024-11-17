import {
  ButtonProps as MUIButtonProps,
  IconButtonProps as MUIIconButtonProps,
  IconButtonTypeMap,
} from '@mui/material';
import { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLProps } from 'react';
import { LinkProps } from 'react-router-dom';

/* 
  Button
*/
type AssignProps<T, P> = P & Omit<T, keyof P>;
type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;
type BaseProps = {
  loading?: boolean;
  disableGutter?: boolean;
  disableTextTransform?: boolean;
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

export type ButtonAsLinkProps = {
  as: 'link';
  href: string;
} & AssignProps<AssignProps<Omit<LinkProps, 'to'>, BaseProps>, MUIButtonProps>;

export type ButtonAsExternalLinkProps = {
  as: 'externalLink';
  href: string;
} & AssignProps<AssignProps<Omit<ExternalLinkProps, 'href'>, BaseProps>, MUIButtonProps>;

export type ButtonProps =
  | ButtonAsButtonProps
  | ButtonAsIconButtonProps
  | ButtonAsUnstyledProps
  | ButtonAsLinkProps
  | ButtonAsExternalLinkProps;

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
