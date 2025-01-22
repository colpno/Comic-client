import { useEffect } from 'react';

export type UseOnScrollCallback = (event: Event) => void;

/**
 * Hook that listens to the scroll event on the window.
 * @param callback The function to call when the scroll event is triggered.
 */
const useScroll = (callback: UseOnScrollCallback) => {
  useEffect(() => {
    window.addEventListener('scroll', callback);
    return () => {
      window.removeEventListener('scroll', callback);
    };
  }, [callback]);
};

export default useScroll;
