import {
  FormControlLabelProps as MUIFormControlLabelProps,
  RadioGroupProps as MUIRadioGroupProps,
  RadioProps as MUIRadioProps,
} from '@mui/material';

export interface RadioGroupOption {
  label: string;
  value: string;
}

export interface RadioGroupProps {
  name: string;
  label?: string;
  options: RadioGroupOption[];
  defaultValue?: RadioGroupOption;
  required?: boolean;
  slotProps?: {
    group?: MUIRadioGroupProps;
    radio?: MUIRadioProps;
    label?: MUIFormControlLabelProps;
  };
}
