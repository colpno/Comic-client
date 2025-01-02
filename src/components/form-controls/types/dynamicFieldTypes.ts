import { TextFieldProps } from '@mui/material';
import { Control, FieldError } from 'react-hook-form';

export interface Errors {
  [key: string | number]: FieldError;
}

type RenderInputParameter = { control: InputFieldProps['control'] } & Omit<Props, 'renderInput'>;

type SlotProps = TextFieldProps['slotProps'] & {
  container?: React.HTMLAttributes<HTMLDivElement>;
};

export interface Props
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

export interface InputFieldProps extends Props {
  error?: boolean;
  index: number;
  control: Control;
}

// export interface Props
//   extends Omit<
//     TextFieldProps,
//     'name' | 'label' | 'required' | 'fullWidth' | 'disabled' | 'slotProps'
//   > {
//   name: string;
//   label?: string;
//   required?: boolean;
//   fullWidth?: boolean;
//   disabled?: boolean;
//   renderInput?: (props: RenderInputParameter, index: number) => JSX.Element;
//   slotProps?: TextFieldProps & {
//     container?: React.HTMLAttributes<HTMLDivElement>;
//     input?: InputFieldProps;
//   };
// }

// export interface InputFieldProps extends Omit<Props, 'slotProps'> {
//   error?: boolean;
//   index: number;
//   control: Control;
//   slotProps?: TextFieldProps['slotProps'];
// }
