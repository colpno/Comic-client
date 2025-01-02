import { FormHelperText } from '@mui/material';
import { forwardRef, Ref } from 'react';
import { UseFieldArrayRemove } from 'react-hook-form';

import { Errors, InputFieldProps } from '../../types/dynamicFieldTypes.ts';
import DeleteFieldButton from './DynamicFieldDeleteButton.tsx';
import InputField from './DynamicFieldInput.tsx';

type InputProps = Omit<InputList, 'fields'> & Omit<InputFieldProps, 'error'>;

const Input = forwardRef(
  ({ index, errors, onDeleteClick, ...props }: InputProps, ref: Ref<HTMLInputElement>) => {
    const error = errors?.[index];
    const notFirstInput = index > 0;

    return (
      <div>
        <div className="flex items-center gap-2">
          <InputField {...props} index={index} error={!!error} ref={ref} />
          {notFirstInput && (
            <DeleteFieldButton onClick={() => onDeleteClick(index)} disabled={props.disabled} />
          )}
        </div>
        {error && <FormHelperText>{error.message}</FormHelperText>}
      </div>
    );
  }
);

interface InputList extends Omit<InputFieldProps, 'error' | 'index'> {
  fields: Record<'id', string>[];
  onDeleteClick: UseFieldArrayRemove;
  errors?: Errors;
}

const DynamicFieldInputList = forwardRef(
  ({ fields, ...props }: InputList, ref: Ref<HTMLInputElement>) => {
    return fields.map((item, index) => <Input {...props} ref={ref} index={index} key={item.id} />);
  }
);

export default DynamicFieldInputList;
