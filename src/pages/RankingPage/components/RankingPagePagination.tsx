import { useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  onIntersect: () => Promise<void>;
}

function RankingPagePagination({ onIntersect }: Props) {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getNextPage = useCallback(() => {
    setIsLoading(true);

    onIntersect().then(() => {
      setIsLoading(false);
    });
  }, [onIntersect]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          getNextPage();
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
  }, [getNextPage]);

  return (
    <div ref={observerRef}>
      {isLoading && (
        <div className="flex items-center justify-center *:bg-primary *:size-[0.6rem] gap-2 *:rounded-full [&>*:nth-child(odd)]:animate-[infinite-scroll-odd-dots_1.2s_infinite] [&>*:nth-child(even)]:animate-[infinite-scroll-even-dots_1.2s_infinite] mt-10">
          <div />
          <div />
          <div />
        </div>
      )}
    </div>
  );
}

export default RankingPagePagination;
