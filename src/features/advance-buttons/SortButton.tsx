import { useState } from 'react';
import { FaSortNumericDown, FaSortNumericUp } from 'react-icons/fa';

import { Button } from '~/components/index.ts';
import { ApiSortOrder, ButtonAsIconButtonProps } from '~/types/index.ts';

interface Props extends Partial<Omit<ButtonAsIconButtonProps, 'onChange' | 'defaultValue'>> {
  defaultValue?: ApiSortOrder;
  onChange: (order: ApiSortOrder) => void;
}

function SortButton({ onChange, defaultValue, ...props }: Props) {
  const [order, setOrder] = useState<ApiSortOrder>(defaultValue ?? 'asc');

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
