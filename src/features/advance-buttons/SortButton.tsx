import { useEffect, useState } from 'react';
import { FaSortNumericDown, FaSortNumericUp } from 'react-icons/fa';

import { Button, ButtonAsIconButtonProps } from '~/components/index.ts';

interface Props extends Partial<Omit<ButtonAsIconButtonProps, 'onChange'>> {
  onChange: (isAsc: boolean) => void;
}

function SortButton({ onChange, ...props }: Props) {
  const [isAsc, setIsAsc] = useState(false);

  const toggleSort = () => setIsAsc((prev) => !prev);

  useEffect(() => {
    onChange(isAsc);
  }, [isAsc]);

  return (
    <Button as="iconButton" {...props} onClick={toggleSort}>
      {isAsc ? <FaSortNumericDown /> : <FaSortNumericUp />}
    </Button>
  );
}

export default SortButton;
