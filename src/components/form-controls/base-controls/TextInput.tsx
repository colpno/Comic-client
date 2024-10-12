import { TextField, TextFieldProps as MUITextFieldProps } from '@mui/material';
import { forwardRef, ReactNode, Ref, useState } from 'react';

import { ShowPasswordAdornment } from '../components/ShowPasswordAdornment.tsx';

type TextInputChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

interface Props extends Omit<MUITextFieldProps, 'name' | 'onChange'> {
  name: string;
  onChange?: (value: string) => void;
  label?: ReactNode;
  uppercase?: boolean;
}

const TextInput = forwardRef(
  ({ uppercase, required, value, onChange, type, ...props }: Props, ref: Ref<HTMLDivElement>) => {
    const handleChange = (e: TextInputChangeEvent) => {
      let value = e.target.value;
      if (uppercase) {
        value = e.target.value.toUpperCase();
      }
      onChange?.(value);
    };

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    let endAdornment = null;
    if (type === 'password') {
      endAdornment = (
        <ShowPasswordAdornment onClick={handleClickShowPassword} showPassword={showPassword} />
      );
    }

    return (
      <TextField
        {...props}
        slotProps={{
          ...props.slotProps,
          input: { endAdornment, ...props.slotProps?.input },
          inputLabel: { required },
        }}
        hidden={type === 'hidden' || props.hidden}
        required={required}
        value={value || ''}
        onChange={handleChange}
        ref={ref}
        type={type === 'password' && showPassword ? 'text' : type}
      />
    );
  }
);

export default TextInput;
