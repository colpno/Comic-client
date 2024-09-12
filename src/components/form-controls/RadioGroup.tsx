import FormControl from '@mui/material/FormControl/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText/FormHelperText';
import FormLabel from '@mui/material/FormLabel/FormLabel';
import Radio from '@mui/material/Radio/Radio';
import MUIRadioGroup from '@mui/material/RadioGroup/RadioGroup';
import useTheme from '@mui/material/styles/useTheme';
import { InputHTMLAttributes, memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export interface Option {
  label: string;
  value: string | boolean;
}

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'defaultValue' | 'name'> {
  name: string;
  label?: string;
  options: Option[];
  defaultValue?: Option;
}

function RadioGroup(props: Props) {
  const { label, name, options, required, defaultValue = null } = props;
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
            onChange={(_e, value) => {
              if (value === 'true' || value === 'false') onChange(value === 'true');
              else onChange(value);
            }}
            row
          >
            {options.map(({ value, label }, index) => (
              <FormControlLabel
                value={value}
                label={label}
                control={
                  <Radio
                    sx={{
                      color: theme.palette.grey['600'],
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
