import {
  Checkbox,
  CheckboxProps as MUICheckboxProps,
  FormControl,
  FormControlLabel,
  FormControlLabelProps as MUIFormControlLabelProps,
  FormGroup,
  FormGroupProps as MUIFormGroupProps,
  FormHelperText,
  FormLabel,
  useTheme,
} from '@mui/material';
import { memo } from 'react';
import { Controller, ControllerRenderProps, useFormContext } from 'react-hook-form';

import { CheckboxOption } from '~/types/formControlTypes.ts';

interface CheckBoxGroupProps {
  name: string;
  label?: string;
  options: CheckboxOption[];
  defaultValue?: CheckboxOption[];
  required?: boolean;
  slotProps?: {
    group?: MUIFormGroupProps;
    checkbox?: MUICheckboxProps;
    label?: MUIFormControlLabelProps;
  };
}

function CheckBoxGroup(props: CheckBoxGroupProps) {
  const { label, name, options, required, defaultValue = [], slotProps } = props;
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

  const handleChange = (field: ControllerRenderProps, item: CheckboxOption) => {
    // Not in checked list, then add to checked list
    if (!field.value.includes(item.value)) {
      field.onChange([...field.value, item.value]);
      return;
    }

    // In checked list, then remove it from checked list
    const newTopics = field.value.filter((topic: string) => topic !== item.value);
    field.onChange(newTopics);
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
