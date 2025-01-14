import { useState } from 'react';
import { FaSortNumericDown, FaSortNumericUp } from 'react-icons/fa';

import { Button, ButtonAsIconButtonProps } from '~/components/index.ts';
import { SortOrder } from '~/types/apiTypes.ts';

interface Props extends Partial<Omit<ButtonAsIconButtonProps, 'onChange' | 'defaultValue'>> {
  defaultValue?: SortOrder;
  onChange: (order: SortOrder) => void;
}

function SortButton({ onChange, defaultValue, ...props }: Props) {
  const [order, setOrder] = useState<SortOrder>(defaultValue ?? 'asc');

  const toggleSort = () => {
    setOrder((prev) => {
      const newValue = prev === 'asc' ? 'desc' : 'asc';
      onChange(newValue);
      return newValue;
    });
  };

  return (
    <Button as="iconButton" {...props} onClick={toggleSort}>
      {order === 'asc' ? <FaSortNumericDown /> : <FaSortNumericUp />}
    </Button>
  );
}

export default SortButton;
