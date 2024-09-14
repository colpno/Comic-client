import { FormControl, FormControlProps, FormHelperText } from '@mui/material';
import {
  DatePicker as MUIDatePicker,
  DatePickerProps as MUIDatePickerProps,
  PickerValidDate,
} from '@mui/x-date-pickers';
import moment from 'moment';
import { memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { DATE_FORMAT } from '~/constants/common.ts';

export interface DatePickerProps extends MUIDatePickerProps<PickerValidDate> {
  name: string;
  required?: boolean;
  fullWidth?: boolean;
  formControlProps?: FormControlProps;
}

function DatePicker({
  name,
  required,
  fullWidth,
  formControlProps,
  slotProps,
  format,
  defaultValue = null,
  ...props
}: DatePickerProps) {
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
  const dateFormat = format || DATE_FORMAT;

  return (
    <FormControl
      error={!!errorMessage}
      fullWidth={fullWidth}
      required={required}
      {...formControlProps}
    >
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field: { value, onChange, ...field } }) => (
          <MUIDatePicker
            format={dateFormat}
            {...props}
            slotProps={{ textField: { required, fullWidth, error: !!errorMessage, ...slotProps } }}
            {...field}
            value={value ? moment(value) : null}
            onChange={(date) => date && onChange(date.format(dateFormat))}
          />
        )}
      />
      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
}

export default memo(DatePicker);
