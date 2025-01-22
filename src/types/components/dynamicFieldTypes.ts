import { TextFieldProps } from '@mui/material';
import { Control, FieldError } from 'react-hook-form';

export interface DynamicFieldErrors {
  [key: string | number]: FieldError;
}

type RenderInputParameter = { control: DynamicFieldInputProps['control'] } & Omit<
  DynamicFieldProps,
  'renderInput'
>;

type SlotProps = TextFieldProps['slotProps'] & {
  container?: React.HTMLAttributes<HTMLDivElement>;
};

export interface DynamicFieldProps
  extends Omit<
    TextFieldProps,
    'name' | 'label' | 'required' | 'fullWidth' | 'disabled' | 'slotProps'
  > {
  name: string;
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  renderInput?: (props: RenderInputParameter, index: number) => JSX.Element;
  slotProps?: SlotProps;
}

export interface DynamicFieldInputProps extends DynamicFieldProps {
  error?: boolean;
  index: number;
  control: Control;
}
