import { FormControl, FormControlProps, FormHelperText } from '@mui/material';
import { ComponentProps, memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import TextInput from './base-controls/TextInput';

interface Props extends Omit<ComponentProps<typeof TextInput>, 'onChange' | 'slotProps'> {
  name: string;
  label?: string;
  uppercase?: boolean;
  slotProps?: React.ComponentProps<typeof TextInput>['slotProps'] & {
    container?: FormControlProps;
  };
}

function TextField({ name, required, fullWidth, defaultValue, ...props }: Props) {
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
      {...props.slotProps?.container}
      error={!!errorMessage}
      fullWidth={fullWidth}
      required={required}
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
