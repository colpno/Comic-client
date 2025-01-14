import {
  CheckboxProps as MUICheckboxProps,
  FormControlLabelProps as MUIFormControlLabelProps,
  FormGroupProps as MUIFormGroupProps,
} from '@mui/material';

export interface Option {
  label: string;
  value: string;
}

export interface Props {
  name: string;
  label?: string;
  options: Option[];
  defaultValue?: Option[];
  required?: boolean;
  slotProps?: {
    group?: MUIFormGroupProps;
    checkbox?: MUICheckboxProps;
    label?: MUIFormControlLabelProps;
  };
  onChange?: (value: string[]) => void;
}
