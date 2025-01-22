import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup as MUIRadioGroup,
  useTheme,
} from '@mui/material';
import { memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { RadioGroupProps } from '~/types/index.ts';

function RadioGroup(props: RadioGroupProps) {
  const { label, name, options, required, defaultValue = null, slotProps } = props;
  const theme = useTheme();
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
    <FormControl error={!!errorMessage} required={required}>
      <FormLabel>{label}</FormLabel>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field: { onChange, ...field } }) => (
          <MUIRadioGroup
            {...field}
            {...slotProps?.group}
            onChange={(_e, value) => {
              if (value === 'true' || value === 'false') onChange(value === 'true');
              else onChange(value);
            }}
          >
            {options.map(({ value, label }, index) => (
              <FormControlLabel
                {...slotProps?.label}
                value={value}
                label={label}
                control={
                  <Radio
                    {...slotProps?.radio}
                    sx={{
                      color: theme.palette.grey['600'],
                      ...slotProps?.radio?.sx,
                    }}
                  />
                }
                key={`${label}-${index}`}
              />
            ))}
          </MUIRadioGroup>
        )}
      />
      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
}

export default memo(RadioGroup);
