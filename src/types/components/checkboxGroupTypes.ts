import {
  CheckboxProps as MUICheckboxProps,
  FormControlLabelProps as MUIFormControlLabelProps,
  FormGroupProps as MUIFormGroupProps,
} from '@mui/material';

export interface CheckboxOption {
  label: string;
  value: string;
}

export interface CheckboxProps {
  name: string;
  label?: string;
  options: CheckboxOption[];
  defaultValue?: CheckboxOption[];
  required?: boolean;
  slotProps?: {
    group?: MUIFormGroupProps;
    checkbox?: MUICheckboxProps;
    label?: MUIFormControlLabelProps;
  };
  onChange?: (value: string[]) => void;
}
