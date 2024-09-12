import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import {
  IconButton,
  IconButtonProps,
  InputAdornment,
  InputBaseComponentProps,
  Stack,
} from '@mui/material';
import { forwardRef, useState } from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

import { NumberInputProps, TextInputChangeEvent } from '~/types/formControls.ts';
import TextInput from './TextInput.tsx';

const NumberInput = forwardRef<HTMLDivElement, NumberInputProps>(function NumberInput(props, ref) {
  const {
    disabled = false,
    hideActionButtons = false,
    max = Infinity,
    min = -Infinity,
    numericFormatProps: numericFormatPropsProp,
    onChange,
    size,
    step = 1,
    value: valueProp,
    endAdornment,
    fullWidth,
    error,
    ...rest
  } = props;
  const isControlled = valueProp !== undefined && onChange !== undefined;

  // We use an internal state when the component is uncontrolled
  const [fallbackValue, setFallbackValue] = useState(valueProp);
  const value = isControlled ? valueProp : fallbackValue;
  const setValue = isControlled ? onChange : setFallbackValue;

  const increment = () => {
    // If we increment when the input is empty, we consider the previous value to be 0
    const newValue = (value != null && !Number.isNaN(value) ? value : 0) + step;

    if (newValue > max) {
      return;
    }

    setValue(newValue);
  };

  const decrement = () => {
    // If we decrement when the input is empty, we consider the previous value to be 0
    const newValue = (value != null && !Number.isNaN(value) ? value : 0) - step;

    if (newValue < min) {
      return;
    }

    setValue(newValue);
  };

  const numericFormatProps: NumericFormatProps = {
    // We set a default to avoid displaying floating point errors when using a decimal step
    decimalScale: 5,

    // react-number-format doesn't provide min or max props so we do the checking here instead
    isAllowed: ({ floatValue }) => {
      if (floatValue == null) {
        return true;
      }

      return floatValue >= min && floatValue <= max;
    },

    // Only add the min, max and step html attributes when the value isn't the default one
    max: max !== Infinity ? max : undefined,
    min: min !== -Infinity ? min : undefined,
    step: step !== 1 ? step : undefined,

    // Allow to increment with ArrowUp and decrement with ArrowDown
    onKeyDown: (event) => {
      if (event.key === 'ArrowUp') {
        increment();
      } else if (event.key === 'ArrowDown') {
        decrement();
      }
    },

    onValueChange: ({ floatValue }) => {
      // When incrementing or decrementing, the value prop is already up to date
      // so we make sure the value needs to be updated to prevent an unnecessary re-render
      if (floatValue === value) {
        return;
      }

      setValue(floatValue ?? null);
    },
    value,

    ...numericFormatPropsProp,
  };

  const commonAdornmentButtonProps: IconButtonProps = {
    edge: 'end',
    sx: { p: size !== 'small' ? '1px' : 0 },
  };

  return (
    <TextInput
      {...rest}
      ref={ref}
      value={value ?? ''} // We can't ever pass null to value because it breaks the shrink state of the label, so we pass empty string instead
      onChange={(e) => {
        const event = e as TextInputChangeEvent;
        onChange?.(event.target.value ? parseFloat(event.target.value) : null);
      }}
      disabled={disabled}
      error={error}
      size={size}
      fullWidth={fullWidth}
      slotProps={{
        input: {
          ...props.slotProps?.input,
          inputComponent: NumericFormatCustom as React.ElementType<InputBaseComponentProps>,
          endAdornment: !hideActionButtons && (
            <>
              {endAdornment && <InputAdornment position="end">{endAdornment}</InputAdornment>}
              <InputAdornment position="end">
                <Stack>
                  <IconButton
                    aria-label={'incrementAriaLabel'}
                    disabled={disabled || (value ?? 0) + step > max}
                    onClick={increment}
                    {...commonAdornmentButtonProps}
                  >
                    <KeyboardArrowUp fontSize={size} />
                  </IconButton>
                  <IconButton
                    aria-label={'decrementAriaLabel'}
                    disabled={disabled || (value ?? 0) - step < min}
                    onClick={decrement}
                    {...commonAdornmentButtonProps}
                  >
                    <KeyboardArrowDown fontSize={size} />
                  </IconButton>
                </Stack>
              </InputAdornment>
            </>
          ),
        },
        // @ts-expect-error The type should be React.ComponentProps<typeof inputComponent> but instead
        // it is hard-coded to InputBaseComponentProps
        htmlInput: { ...inputProps, ...numericFormatProps },
      }}
    />
  );
});

const NumericFormatCustom = forwardRef<HTMLInputElement, NumericFormatProps>(
  function NumericFormatCustom(props, ref) {
    const { decimalSeparator, thousandSeparator, value, ...rest } = props;
    // const locale = 'vi_VN';

    // const defaultThousandSeparator = React.useMemo(() => getThousandSeparator(locale), [locale]);
    const defaultThousandSeparator = undefined;

    // const defaultDecimalSeparator = React.useMemo(() => getDecimalSeparator(locale), [locale]);
    const defaultDecimalSeparator = undefined;

    return (
      <NumericFormat
        {...rest}
        value={value ?? ''} // We can't ever pass null to value because it breaks the shrink state of the label, so we pass empty string instead
        getInputRef={ref}
        thousandSeparator={thousandSeparator ?? defaultThousandSeparator}
        decimalSeparator={decimalSeparator ?? defaultDecimalSeparator}
      />
    );
  }
);

export default NumberInput;
