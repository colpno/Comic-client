import { useEffect, useRef, useState } from 'react';

type Element = HTMLElement | null;
type UseObserverReturnedValue = {
  /** Pass to ref prop. */
  setElementRef: React.Dispatch<React.SetStateAction<Element>>;
};
type UseObserver = (executeFC?: () => void, removeFC?: () => void) => UseObserverReturnedValue;

/**
 * Hook to observe an element.
 * @param executeFC Callback function to execute when the element is intersecting.
 * @param removeFC Callback function to execute when the element is not intersecting.
 */
const useObserver: UseObserver = (executeFC, removeFC) => {
  const [elementRef, setElementRef] = useState<Element>(null);

  const observer = useRef(
    new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          executeFC?.();
        } else {
          removeFC?.();
        }
      });
    })
  );

  useEffect(() => {
    const currentElement = elementRef;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [elementRef]);

  return { setElementRef };
};

export default useObserver;
