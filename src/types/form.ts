import { HTMLAttributes, ReactNode } from 'react';
import { FieldValues, UseFormProps, UseFormReturn } from 'react-hook-form';
import { ZodSchema } from 'zod';

export interface FormCallbackChildrenArgs<FormValues extends FieldValues>
  extends UseFormReturn<FormValues> {
  formId: Exclude<HTMLAttributes<HTMLFormElement>['id'], undefined>;
}

export interface FormProps<FormValues extends FieldValues = FieldValues>
  extends Omit<HTMLAttributes<HTMLFormElement>, 'children' | 'onSubmit'> {
  children: ReactNode | ((childrenProps: FormCallbackChildrenArgs<FormValues>) => ReactNode);
  validationSchema: ZodSchema;
  defaultValues?: UseFormProps<FormValues>['defaultValues'];
  /** Determines the form will only return the value of fields that had been changed. */
  submitDirtyValuesOnly?: boolean;
  /** Use promise to determine the form loading state. */
  onSubmit: (data: FormValues) => Promise<void> | void;
}
