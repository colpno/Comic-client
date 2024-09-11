import {
  AutocompleteProps as MUIAutocompleteProps,
  AutocompleteValue as MUIAutocompleteValue,
} from '@mui/material/Autocomplete/Autocomplete';
import { ButtonProps as MUIButtonProps } from '@mui/material/Button/Button';
import { TextFieldProps as MUITextFieldProps } from '@mui/material/TextField/TextField';
import { AnchorHTMLAttributes, ReactNode } from 'react';
import { NumericFormatProps } from 'react-number-format/types/types';
import { LinkProps, To } from 'react-router-dom';

/* 
  Autocomplete
*/
export type AutocompleteOption = {
  groupByProperty?: string;
  label: string;
  value: string;
};

type CustomTextFieldProps = Omit<
  MUITextFieldProps,
  'label' | 'error' | 'InputLabelProps' | 'fullWidth' | 'placeholder'
>;

type CustomAutocompleteProps<T extends AutocompleteOption> = Omit<
  MUIAutocompleteProps<T, boolean | undefined, boolean | undefined, boolean | undefined>,
  'onChange' | 'renderInput'
>;

export type AutocompleteValue<T> = MUIAutocompleteValue<
  T,
  boolean | undefined,
  boolean | undefined,
  boolean | undefined
>;

export interface AutocompleteProps<T extends AutocompleteOption = AutocompleteOption>
  extends CustomAutocompleteProps<T> {
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

type ButtonAsButtonProps = AssignProps<MUIButtonProps, BaseProps> & {
  to?: never;
  href?: never;
};

type ButtonAsLinkProps = AssignProps<LinkProps, BaseProps> &
  AssignProps<LinkProps, MUIButtonProps> & {
    to: To;
    href?: never;
  };

type ButtonAsExternalLinkProps = AssignProps<ExternalLinkProps, BaseProps> &
  AssignProps<ExternalLinkProps, MUIButtonProps> & {
    to?: never;
    href: ExternalLinkProps['href'];
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps | ButtonAsExternalLinkProps;
