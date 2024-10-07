import { Close } from '@mui/icons-material';
import { Box, FormControl, FormHelperText, Grid } from '@mui/material';
import { forwardRef, memo, Ref } from 'react';
import { Control, Controller, FieldError, useFieldArray, useFormContext } from 'react-hook-form';

import { Button } from '~/components/index.ts';
import { ButtonAsButtonProps, ButtonAsIconButtonProps } from '~/types/formControls.ts';
import TextInput from './components/TextInput.tsx';

type RenderInputArgs = { control: InputFieldProps['control'] } & Omit<
  DynamicFieldProps,
  'renderInput'
>;

interface InputFieldProps extends DynamicFieldProps {
  error?: boolean;
  index: number;
  control: Control;
}

interface Errors {
  [key: string | number]: FieldError;
}

export interface DynamicFieldProps {
  name: string;
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  renderInput?: (props: RenderInputArgs, index: number) => JSX.Element;
}

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
    const errors = getFieldState(name)?.error as unknown as Errors;
    const { fields, append, remove } = useFieldArray({ control, name });

    return (
      <FormControl fullWidth={fullWidth} disabled={disabled} error={!!errors}>
        <Grid container spacing={2}>
          {fields.length === 0 ? (
            <Grid item container>
              <Grid item xs={12} display="flex" gap={1}>
                <Box flex={1} display="flex" flexDirection="column" gap="0.3rem">
                  <InputField
                    {...props}
                    index={0}
                    name={name}
                    error={!!errors}
                    required={required}
                    fullWidth={fullWidth}
                    control={control}
                    ref={ref}
                  />
                </Box>
              </Grid>
              {errors?.[0] && <FormHelperText>{errors[0].message}</FormHelperText>}
            </Grid>
          ) : (
            fields.map((item, index) => (
              <Grid item container key={item.id}>
                <Grid item xs={12} display="flex" gap={1}>
                  <Box flex={1} display="flex" flexDirection="column" gap="0.3rem">
                    <InputField
                      {...props}
                      index={index}
                      name={name}
                      error={!!errors}
                      required={required}
                      fullWidth={fullWidth}
                      control={control}
                      ref={ref}
                    />
                  </Box>
                  {index > 0 && <ButtonDelete onClick={() => remove(index)} disabled={disabled} />}
                </Grid>
                {errors?.[index] && <FormHelperText>{errors[index].message}</FormHelperText>}
              </Grid>
            ))
          )}
        </Grid>
        {errors?.root && <FormHelperText>{errors.root.message}</FormHelperText>}
        <ButtonMore disabled={disabled} onClick={() => append(null)} />
      </FormControl>
    );
  }
);

const InputField = forwardRef(
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

function ButtonMore(props: ButtonAsButtonProps) {
  return (
    <Button
      variant="text"
      color="inherit"
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.01)',
        '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.04)' },
      }}
      {...props}
    >
      More
    </Button>
  );
}

function ButtonDelete(props: Partial<ButtonAsIconButtonProps>) {
  return (
    <Button
      as="iconButton"
      size="small"
      color="inherit"
      sx={{
        '&:hover': { color: 'var(--red-color)' },
      }}
      style={{ width: 'unset', height: 'unset' }}
      {...props}
    >
      <Close />
    </Button>
  );
}

export default memo(DynamicField);
