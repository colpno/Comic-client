import { zodResolver } from '@hookform/resolvers/zod';
import { memo, useEffect, useId } from 'react';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { FormProps } from '~/types/form.ts';
import { getDirtyValues } from './helpers/getDirtyValues.ts';

function Form<FormValueTypes extends FieldValues>(props: FormProps<FormValueTypes>) {
  const {
    children,
    validationSchema,
    returnDirtyValuesOnly,
    defaultValues,
    onSubmit,
    onWatch,
    ...formProps
  } = props;

  const useFormStates = useForm<FormValueTypes>({
    resolver: zodResolver(validationSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { dirtyFields },
    reset,
    watch,
    setValue,
  } = useFormStates;

  const formID = `form-${useId()}`;

  //   Watch for changes in the form fields
  useEffect(() => {
    if (!onWatch) return;

    const subscription = watch((value, { name, type }) =>
      onWatch({
        value: value as FormValueTypes,
        setFieldValue: setValue,
        fieldName: name,
        action: type,
      })
    );

    return () => subscription.unsubscribe();
  }, [onWatch, setValue, watch]);

  const submitHandler: SubmitHandler<FormValueTypes> = (data) => {
    if (returnDirtyValuesOnly) {
      const dirtyData = getDirtyValues(dirtyFields, data) as FormValueTypes;

      if (Object.keys(dirtyData).length > 0) onSubmit(dirtyData);
    } else {
      onSubmit(data);
    }
  };

  return (
    <FormProvider {...useFormStates}>
      <form {...formProps} id={formID} onSubmit={handleSubmit(submitHandler)}>
        {typeof children === 'function' ? children({ formID, reset }) : children}
      </form>
    </FormProvider>
  );
}

export default memo(Form);
