import { FormControl, FormHelperText } from '@mui/material';
import { forwardRef, memo, Ref } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { DynamicFieldErrors, DynamicFieldProps } from '~/types/index.ts';
import { cn } from '~/utils/cssUtils.ts';
import InputField from './components/DynamicFieldInput.tsx';
import InputList from './components/DynamicFieldInputList.tsx';
import MoreFieldButton from './components/DynamicFieldMoreButton.tsx';

const DynamicField = forwardRef(
  (
    { name, required, fullWidth, disabled, ...props }: DynamicFieldProps,
    ref: Ref<HTMLInputElement>
  ) => {
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
    const errors = getFieldState(name)?.error as unknown as DynamicFieldErrors;
    const { fields, append, remove } = useFieldArray({ control, name });
    const hasNoFieldsInitially = fields.length === 0;
    const firstInputError = errors?.[0];
    const rootError = errors?.root;

    return (
      <FormControl className="space-y-2" fullWidth={fullWidth} disabled={disabled} error={!!errors}>
        <div
          {...props.slotProps?.container}
          className={cn('space-y-2', props.slotProps?.container?.className)}
        >
          {hasNoFieldsInitially ? (
            <div className={cn(fullWidth && 'w-full')}>
              <InputField
                {...props}
                index={0}
                name={name}
                error={!!firstInputError}
                required={required}
                fullWidth={fullWidth}
                control={control}
                ref={ref}
              />
              {firstInputError && <FormHelperText>{firstInputError.message}</FormHelperText>}
            </div>
          ) : (
            <InputList
              {...props}
              name={name}
              required={required}
              fullWidth={fullWidth}
              control={control}
              ref={ref}
              fields={fields}
              errors={errors}
              onDeleteClick={remove}
            />
          )}
        </div>
        {rootError && <FormHelperText>{rootError.message}</FormHelperText>}
        <MoreFieldButton disabled={disabled} onClick={() => append(null)} />
      </FormControl>
    );
  }
);

export default memo(DynamicField);
