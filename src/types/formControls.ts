import {
  AutocompleteProps as MUIAutocompleteProps,
  AutocompleteValue as MUIAutocompleteValue,
  ButtonProps as MUIButtonProps,
  TextFieldProps as MUITextFieldProps,
} from '@mui/material';
import { AnchorHTMLAttributes, ReactNode } from 'react';
import { NumericFormatProps } from 'react-number-format/types/types';
import { LinkProps, To } from 'react-router-dom';

/* 
  Autocomplete
*/
export type Option = {
  groupByProperty?: string;
  label: string;
  value: string;
};

type CustomTextFieldProps = Omit<
  MUITextFieldProps,
  'label' | 'error' | 'InputLabelProps' | 'fullWidth' | 'placeholder'
>;

type CustomAutocompleteProps<T extends Option> = Omit<
  MUIAutocompleteProps<T, boolean | undefined, boolean | undefined, boolean | undefined>,
  'onChange' | 'renderInput'
>;

export type AutocompleteValue<T> = MUIAutocompleteValue<
  T,
  boolean | undefined,
  boolean | undefined,
  boolean | undefined
>;

export interface AutocompleteProps<T extends Option = Option> extends CustomAutocompleteProps<T> {
  name?: string;
  label?: string;
  error?: boolean;
  required?: boolean;
  onChange: (data: AutocompleteValue<T>) => void;
  textFieldProps?: CustomTextFieldProps;
  returnLabeOnly?: boolean;
  returnValueOnly?: boolean;
  group?: boolean;
  groupOrder?: 'asc' | 'desc';
  placeholder?: string;
}

/* 
  TextInput
*/
export type TextInputChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
export interface TextInputProps extends Omit<MUITextFieldProps, 'name' | 'onChange'> {
  name: string;
  onChange?: (value: TextInputChangeEvent | unknown) => void;
  label?: ReactNode;
  uppercase?: boolean;
}

/* 
  NumberInput
*/

export type NumberInputProps = Omit<MUITextFieldProps, 'onChange' | 'name'> & {
  name: string;
  hideActionButtons?: boolean;
  max?: number;
  min?: number;
  numericFormatProps?: NumericFormatProps;
  onChange?: (value: number | null) => void;
  step?: number;
  value?: number | null;
  endAdornment?: React.ReactNode;
  fullWidth?: boolean;
  error?: boolean;
};

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

type ButtonAsButtonProps = {
  to?: never;
  href?: never;
  unstyled?: boolean;
} & AssignProps<MUIButtonProps, BaseProps>;

type ButtonAsLinkProps = {
  to: To;
  href?: never;
  unstyled?: never;
} & AssignProps<LinkProps, BaseProps> &
  AssignProps<LinkProps, MUIButtonProps>;

type ButtonAsExternalLinkProps = {
  to?: never;
  href: ExternalLinkProps['href'];
  unstyled?: never;
} & AssignProps<ExternalLinkProps, BaseProps> &
  AssignProps<ExternalLinkProps, MUIButtonProps>;

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps | ButtonAsExternalLinkProps;
