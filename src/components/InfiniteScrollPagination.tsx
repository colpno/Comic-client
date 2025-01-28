import { memo, useEffect, useRef, useState } from 'react';

interface Props {
  onIntersect: () => void | Promise<void>;
  isLoading?: boolean;
}

function InfiniteScrollPagination({ onIntersect, isLoading }: Props) {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const firstMount = useRef(true);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsIntersecting(true);
        }
      },
      { threshold: 1 }
    );

    const observerNode = observerRef.current;

    if (observerNode) {
      observer.observe(observerNode);
    }

    return () => {
      if (observerNode) {
        observer.unobserve(observerNode);
      }
    };
  }, []);

  useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
    }
  }, []);

  useEffect(() => {
    if (isIntersecting && !firstMount.current) {
      setIsIntersecting(false);

      if (onIntersect instanceof Promise) {
        const callback = onIntersect as () => Promise<void>;

        callback();
      } else {
        onIntersect();
      }
    }
  }, [isIntersecting, firstMount.current]);

  return (
    <div ref={observerRef}>
      {isLoading && (
        <div className="flex items-center justify-center *:bg-primary-500 *:size-[0.6rem] gap-2 *:rounded-full [&>*:nth-child(odd)]:animate-[infinite-scroll-odd-dots_1.2s_infinite] [&>*:nth-child(even)]:animate-[infinite-scroll-even-dots_1.2s_infinite] mt-10">
          <div />
          <div />
          <div />
        </div>
      )}
    </div>
  );
}

export default memo(InfiniteScrollPagination);
