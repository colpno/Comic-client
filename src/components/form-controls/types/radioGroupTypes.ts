import {
  FormControlLabelProps as MUIFormControlLabelProps,
  RadioGroupProps as MUIRadioGroupProps,
  RadioProps as MUIRadioProps,
} from '@mui/material';

export interface Option {
  label: string;
  value: string;
}

export interface Props {
  name: string;
  label?: string;
  options: Option[];
  defaultValue?: Option;
  required?: boolean;
  slotProps?: {
    group?: MUIRadioGroupProps;
    radio?: MUIRadioProps;
    label?: MUIFormControlLabelProps;
  };
}
