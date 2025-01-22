import { zodResolver } from '@hookform/resolvers/zod';
import { memo, useId } from 'react';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { FormProps } from '~/types/index.ts';
import { getDirtyValues } from './formUtils.ts';

function Form<F extends FieldValues>({
  children,
  validationSchema,
  submitDirtyValuesOnly,
  defaultValues,
  onSubmit,
  ...props
}: FormProps<F>) {
  const formId = `form-${useId()}`;

  const formStates = useForm<F>({
    resolver: zodResolver(validationSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { dirtyFields },
  } = formStates;

  const submitHandler: SubmitHandler<F> = async (data) => {
    if (submitDirtyValuesOnly) {
      const dirtyData = getDirtyValues(dirtyFields, data) as F;
      if (Object.keys(dirtyData).length > 0) await onSubmit(dirtyData);
    } else {
      await onSubmit(data);
    }
  };

  return (
    <FormProvider {...formStates}>
      <form {...props} id={formId} onSubmit={handleSubmit(submitHandler)}>
        {typeof children === 'function' ? children({ ...formStates, formId: formId }) : children}
      </form>
    </FormProvider>
  );
}

// Explicitly type the memo function
const MemoizedForm = memo(Form) as <F extends FieldValues>(props: FormProps<F>) => JSX.Element;

export default MemoizedForm;
export { type FormProps as FormProps };
