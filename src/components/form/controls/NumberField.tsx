import FormControl from '@mui/material/FormControl/FormControl';
import FormHelperText from '@mui/material/FormHelperText/FormHelperText';
import { memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { NumberInputProps } from '~/types/formControls.ts';
import NumberInput from '../components/NumberInput.tsx';

interface Props extends NumberInputProps {
  name: string;
  label?: string;
  fullWidth?: boolean;
}

function NumberField(props: Props) {
  const { name, fullWidth, required, defaultValue = null, ...others } = props;
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
    <FormControl required={required} fullWidth={fullWidth} error={!!errorMessage}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <NumberInput
            {...others}
            required={required}
            fullWidth={fullWidth}
            error={!!errorMessage}
            {...field}
          />
        )}
      />
      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
}

export default memo(NumberField);
