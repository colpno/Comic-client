import { HTMLAttributes, ReactNode } from 'react';
import { FieldValues, UseFormProps, UseFormReset, UseFormSetValue } from 'react-hook-form';
import { ZodSchema } from 'zod';

export interface ChildrenProps<FormValues extends FieldValues> {
  formID: Exclude<HTMLAttributes<HTMLFormElement>['id'], undefined>;
  reset: UseFormReset<FormValues>;
}

export interface OnWatch<FormValues extends FieldValues> {
  value: FormValues;
  setFieldValue: UseFormSetValue<FormValues>;
  fieldName?: string;
  action?: string;
}

export interface FormProps<FormValues extends FieldValues = FieldValues>
  extends Omit<HTMLAttributes<HTMLFormElement>, 'children' | 'onSubmit'> {
  children: ReactNode | ((childrenProps: ChildrenProps<FormValues>) => ReactNode);
  validationSchema: ZodSchema;
  defaultValues?: UseFormProps<FormValues>['defaultValues'];
  returnDirtyValuesOnly?: boolean;

  onSubmit: (data: FormValues) => void;
  onWatch?: (args: OnWatch<FormValues>) => void;
}
