import TextField from '@mui/material/TextField/TextField';
import { forwardRef, Ref, useState } from 'react';

import { useDeviceWatcher } from '~/hooks/index.ts';
import { TextInputChangeEvent, TextInputProps } from '~/types/formControls.ts';
import { EraseAdornment, ShowPasswordAdornment } from './Adornment.tsx';

const TextInput = forwardRef(
  (
    { uppercase, required, value, onChange, type, ...props }: TextInputProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const isOtherThanDesktopScreen = useDeviceWatcher() !== 'desktop';

    const handleChange = (e: TextInputChangeEvent) => {
      let event = e;
      if (uppercase) {
        event = {
          ...e,
          target: {
            ...e.target,
            value: e.target.value.toUpperCase(),
          },
        };
      }
      onChange?.(event);
    };

    const handleClickErase = () => onChange?.('');

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    let endAdornment = null;
    if (isOtherThanDesktopScreen) {
      const eraseAdornment = value ? <EraseAdornment onClick={handleClickErase} /> : null;

      if (type === 'password') {
        endAdornment = (
          <>
            {eraseAdornment}
            <ShowPasswordAdornment onClick={handleClickShowPassword} showPassword={showPassword} />
          </>
        );
      } else {
        endAdornment = eraseAdornment;
      }
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
