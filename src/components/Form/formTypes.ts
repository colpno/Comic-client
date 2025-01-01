import { FieldValues, UseFormProps, UseFormReturn } from 'react-hook-form';
import { ZodSchema } from 'zod';

type ChildrenAsFunction<FormValues extends FieldValues> = (
  childrenProps: UseFormReturn<FormValues> & {
    formId: Exclude<React.HTMLAttributes<HTMLFormElement>['id'], undefined>;
  }
) => React.ReactNode;

export interface Props<FormValues extends FieldValues = FieldValues>
  extends Omit<React.HTMLAttributes<HTMLFormElement>, 'children' | 'onSubmit'> {
  children: React.ReactNode | ChildrenAsFunction<FormValues>;
  validationSchema: ZodSchema;
  defaultValues?: UseFormProps<FormValues>['defaultValues'];
  /** Determines the form will only return the value of fields that had been changed. */
  submitDirtyValuesOnly?: boolean;
  /** Use promise to determine the form loading state. */
  onSubmit: (data: FormValues) => Promise<void> | void;
}
