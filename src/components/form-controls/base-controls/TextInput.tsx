import { TextField, TextFieldProps as MUITextFieldProps } from '@mui/material';
import { forwardRef, ReactNode, Ref, useState } from 'react';

import { ClearAdornment, PasswordAdornment } from '../components/adornments.tsx';

type TextInputChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

interface Props extends Omit<MUITextFieldProps, 'name' | 'onChange'> {
  name: string;
  onChange?: (value: string) => void;
  label?: ReactNode;
  uppercase?: boolean;
  clearable?: boolean;
}

const TextInput = forwardRef(
  (
    {
      uppercase,
      required,
      value,
      onChange,
      type,
      onBlur,
      onFocus,
      clearable = false,
      ...props
    }: Props,
    ref: Ref<HTMLDivElement>
  ) => {
    const [adornments, setAdornments] = useState<Record<string, boolean>>({
      password: false,
      clear: false,
    });

    const handleChange = (e: TextInputChangeEvent) => {
      let value = e.target.value;
      if (uppercase) {
        value = e.target.value.toUpperCase();
      }
      onChange?.(value);
    };

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setAdornments({
        password: type === 'password',
        clear: clearable,
      });
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setAdornments({ password: false, clear: false });
      onBlur?.(e);
    };

    const renderEndAdornment = () => {
      const showPasswordAdornment = type === 'password' && adornments.password;
      const showClearAdornment = clearable && adornments.clear;

      return (
        <>
          {showClearAdornment && <ClearAdornment onClick={() => onChange?.('')} />}
          {showPasswordAdornment && (
            <PasswordAdornment onClick={handleClickShowPassword} show={showPassword} />
          )}
        </>
      );
    };

    return (
      <TextField
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
        slotProps={{
          ...props.slotProps,
          input: { endAdornment: renderEndAdornment(), ...props.slotProps?.input },
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
