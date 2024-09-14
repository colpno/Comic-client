import { HTMLAttributes, ReactNode } from 'react';
import {
  EventType,
  FieldValues,
  UseFormProps,
  UseFormReset,
  UseFormSetValue,
} from 'react-hook-form';
import { ZodSchema } from 'zod';

export interface FormCallbackChildrenArgs<FormValues extends FieldValues> {
  formId: Exclude<HTMLAttributes<HTMLFormElement>['id'], undefined>;
  reset: UseFormReset<FormValues>;
}

export interface OnWatch<FormValues extends FieldValues> {
  value: FormValues;
  setFieldValue: UseFormSetValue<FormValues>;
  /** the ``name`` property of field. */
  fieldName?: keyof FormValues;
  action?: EventType;
}

export interface FormProps<FormValues extends FieldValues = FieldValues>
  extends Omit<HTMLAttributes<HTMLFormElement>, 'children' | 'onSubmit'> {
  children: ReactNode | ((childrenProps: FormCallbackChildrenArgs<FormValues>) => ReactNode);
  validationSchema: ZodSchema;
  defaultValues?: UseFormProps<FormValues>['defaultValues'];
  /** Determines the form will only return the value of fields that had been changed. */
  returnDirtyValuesOnly?: boolean;

  onSubmit: (data: FormValues) => void;
  onWatch?: (args: OnWatch<FormValues>) => void;
}
