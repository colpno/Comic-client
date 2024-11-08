import { zodResolver } from '@hookform/resolvers/zod';
import { HTMLAttributes, memo, ReactNode, useId } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form';
import { ZodSchema } from 'zod';

import { getDirtyValues } from './formUtils.ts';

type ChildrenAsFunction<FormValues extends FieldValues> = (
  childrenProps: UseFormReturn<FormValues> & {
    formId: Exclude<HTMLAttributes<HTMLFormElement>['id'], undefined>;
  }
) => ReactNode;

interface Props<FormValues extends FieldValues = FieldValues>
  extends Omit<HTMLAttributes<HTMLFormElement>, 'children' | 'onSubmit'> {
  children: ReactNode | ChildrenAsFunction<FormValues>;
  validationSchema: ZodSchema;
  defaultValues?: UseFormProps<FormValues>['defaultValues'];
  /** Determines the form will only return the value of fields that had been changed. */
  submitDirtyValuesOnly?: boolean;
  /** Use promise to determine the form loading state. */
  onSubmit: (data: FormValues) => Promise<void> | void;
}

function Form<F extends FieldValues>({
  children,
  validationSchema,
  submitDirtyValuesOnly,
  defaultValues,
  onSubmit,
  ...props
}: Props<F>) {
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
const MemoizedForm = memo(Form) as <F extends FieldValues>(props: Props<F>) => JSX.Element;

export default MemoizedForm;
