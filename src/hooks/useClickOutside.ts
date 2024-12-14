import { useEffect } from 'react';

import { useKey } from './useKey.ts';

interface Options {
  /**
   * A list of key names that will trigger the callback when pressed.
   */
  keys?: Parameters<typeof useKey>[0];
}

export const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
  options?: Options
) => {
  useKey(options?.keys ?? [], callback);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref]);
};
