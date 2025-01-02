import { forwardRef, Ref } from 'react';
import { Controller } from 'react-hook-form';

import TextInput from '../../base-controls/TextInput.tsx';
import { InputFieldProps } from '../../types/dynamicFieldTypes.ts';

const DynamicFieldInput = forwardRef(
  (
    { control, name, renderInput, index, ...props }: InputFieldProps,
    ref: Ref<HTMLInputElement>
  ) => {
    if (renderInput) {
      return renderInput({ name, control, ...props }, index);
    }

    return (
      <Controller
        name={`${name}.${index}`}
        control={control}
        render={({ field }) => <TextInput {...props} {...field} ref={ref} />}
      />
    );
  }
);

export default DynamicFieldInput;
