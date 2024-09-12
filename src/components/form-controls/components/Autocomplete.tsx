import { Autocomplete as MUIAutocomplete, TextField as MUITextField } from '@mui/material';
import { forwardRef, Ref } from 'react';

import { AutocompleteOption, AutocompleteProps, AutocompleteValue } from '~/types/formControls';

const Autocomplete = forwardRef(
  <T extends AutocompleteOption>(
    {
      options = [],
      value: valueProp,
      onChange: onChangeProp,
      error,
      label,
      required,
      placeholder,
      textFieldProps,
      returnLabeOnly,
      returnValueOnly,
      defaultValue,
      group,
      groupOrder,
      ...props
    }: AutocompleteProps<T>,
    ref: Ref<HTMLDivElement>
  ) => {
    // Turn the value from string to Option-type object
    const mapValueToOption = (
      val: AutocompleteValue<T> | undefined
    ): AutocompleteValue<T> | undefined => {
      const getValue = (v: string) => {
        return options.find((option) => option.label === v || option.value === v) || v;
      };

      if (typeof val === 'string') {
        return getValue(val);
      }

      if (Array.isArray(val)) {
        return val.map((item) => {
          if (typeof item === 'string') return getValue(item);
          return item;
        });
      }

      return val;
    };

    // Return value based on demand
    const handleChange = (data: AutocompleteValue<T>) => {
      const getValue = (val: string) => {
        if (returnLabeOnly) return options.find((option) => option.value === val)!.label;
        if (returnValueOnly) return options.find((option) => option.value === val)!.value;
        return val;
      };

      if (Array.isArray(data)) {
        const result = data.map((item) => {
          if (typeof item === 'string') return getValue(item);

          return returnLabeOnly ? (item as T).label : returnValueOnly ? (item as T).value : item;
        });

        onChangeProp(result);
        return;
      }

      if (typeof data === 'string') {
        onChangeProp(getValue(data));
        return;
      }

      const result = returnLabeOnly
        ? (data as T).label
        : returnValueOnly
        ? (data as T).value
        : data;
      onChangeProp(result);
    };

    if (group) {
      if (!options[0].groupByProperty) {
        throw new Error('groupByProperty is required in option object for group');
      }
      props.groupBy = (option) => option.groupByProperty!;
    }

    return (
      <MUIAutocomplete
        {...props}
        defaultValue={defaultValue ?? props.multiple ? [] : null}
        ref={ref}
        options={
          group
            ? groupOrder === 'desc'
              ? options.slice().sort((a, b) => b.groupByProperty!.localeCompare(a.groupByProperty!))
              : options.slice().sort((a, b) => a.groupByProperty!.localeCompare(b.groupByProperty!))
            : options
        }
        value={mapValueToOption(valueProp)}
        onChange={(_, data) => handleChange(data)}
        renderInput={({ InputLabelProps, ...params }) => (
          <MUITextField
            variant="outlined"
            {...textFieldProps}
            {...params}
            slotProps={{ inputLabel: { ...InputLabelProps, required } }}
            label={label}
            error={error}
            placeholder={placeholder}
          />
        )}
      />
    );
  }
);

export default Autocomplete;
