import { FormControl, FormControlProps, FormHelperText } from '@mui/material';
import { ComponentProps, memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import TextInput from './components/TextInput';

interface Props extends Omit<ComponentProps<typeof TextInput>, 'onChange'> {
  name: string;
  label?: string;
  uppercase?: boolean;
  formControlProps?: FormControlProps;
}

function TextField({
  name,
  required,
  fullWidth,
  formControlProps,
  defaultValue = null,
  ...props
}: Props) {
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
    <FormControl
      error={!!errorMessage}
      fullWidth={fullWidth}
      required={required}
      {...formControlProps}
    >
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={name}
        render={({ field }) => (
          <TextInput
            {...props}
            error={!!errorMessage}
            fullWidth={fullWidth}
            required={required}
            {...field}
          />
        )}
      />
      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
}
export default memo(TextField);
