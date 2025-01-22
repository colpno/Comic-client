import { useEffect, useState } from 'react';

import { PrimitiveValue } from '~/types/index.ts';

export const useDebounce = <T extends PrimitiveValue>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handle = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(handle);
  }, [value]);

  return debouncedValue;
};
