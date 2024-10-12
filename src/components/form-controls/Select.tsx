import { FormControl, FormHelperText } from '@mui/material';
import { ComponentProps, memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import Autocomplete from './base-controls/Autocomplete.tsx';

interface Props
  extends Omit<ComponentProps<typeof Autocomplete>, 'name' | 'value' | 'onChange' | 'onBlur'> {
  name: string;
  label?: string;
}

function Select({ name, fullWidth, required, defaultValue, ...props }: Props) {
  const {
    control,
    /*
     * This is a workaround to trigger validation on first time.
     * Don't know why but when destructuring the errors, the validation will be triggered on first time. Otherwise, it will be triggered on the second time touch or something else.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors: _e },
    getFieldState,
  } = useFormContext();
  const errorMessage = getFieldState(name)?.error?.message;

  return (
    <FormControl error={!!errorMessage} required={required} fullWidth={fullWidth}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || props.multiple ? [] : null}
        render={({ field }) => (
          <Autocomplete
            {...props}
            error={!!errorMessage}
            required={required}
            fullWidth={fullWidth}
            {...field}
          />
        )}
      />
      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
}

export default memo(Select);
