import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  useTheme,
} from '@mui/material';
import { memo } from 'react';
import { Controller, ControllerRenderProps, useFormContext } from 'react-hook-form';

import { Option, Props } from './types/checkboxGroupTypes.ts';

function CheckBoxGroup(props: Props) {
  const { label, name, options, required, defaultValue = [], slotProps, onChange } = props;
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

  const handleChange = (field: ControllerRenderProps, item: Option) => {
    // Not in checked list, then add to checked list
    if (!field.value.includes(item.value)) {
      const newValue = [...field.value, item.value];
      field.onChange(newValue);
      onChange?.(newValue);
      return;
    }

    // In checked list, then remove it from checked list
    const newValues = field.value.filter((v: string) => v !== item.value);
    field.onChange(newValues);
    onChange?.(newValues);
  };

  return (
    <FormControl error={!!errorMessage} required={required}>
      <FormLabel sx={{ color: theme.palette.text.primary }}>{label}</FormLabel>
      <FormGroup {...slotProps?.group}>
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue}
          render={({ field }) => {
            return (
              <>
                {options.map((item) => (
                  <FormControlLabel
                    {...slotProps?.label}
                    key={`${name}-${item.value}`}
                    label={item.label}
                    control={
                      <Checkbox
                        {...slotProps?.checkbox}
                        checked={field.value?.includes(item.value) || false}
                        onChange={() => handleChange(field, item)}
                      />
                    }
                    {...field}
                  />
                ))}
              </>
            );
          }}
        />
      </FormGroup>
      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
}

export default memo(CheckBoxGroup);
export type { Option as CheckboxOption, Props as CheckboxProps };
