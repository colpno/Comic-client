import {
  ButtonProps as MUIButtonProps,
  IconButtonProps as MUIIconButtonProps,
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

export type ButtonAsIconButtonProps = {
  as: 'iconButton';
  children: JSX.Element;
} & AssignProps<Omit<MUIIconButtonProps, 'children'>, BaseProps>;

export type ButtonAsUnstyledProps = {
  as: 'unstyled';
} & AssignProps<ButtonHTMLAttributes<HTMLButtonElement>, BaseProps> &
  HTMLProps<HTMLButtonElement>;

export type ButtonAsLinkProps = {
  as: 'link';
} & AssignProps<AssignProps<LinkProps, BaseProps>, MUIButtonProps>;

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
