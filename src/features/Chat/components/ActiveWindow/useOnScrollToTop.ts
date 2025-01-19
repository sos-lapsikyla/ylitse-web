import { RefObject, useEffect } from 'react';

type ScrollToTopOptions<HTMLElement> = {
  ref: RefObject<HTMLElement>;
  threshold?: number;
  onScrollToTop: () => void;
};

export const useOnScrollToTop = ({
  ref,
  threshold = 1,
  onScrollToTop,
}: ScrollToTopOptions<HTMLElement | null>) => {
  useEffect(() => {
    const targetElement = ref.current;

    const handleScroll = ({ target }: Event) => {
      const { scrollTop } = target as Element;

      if (scrollTop < threshold) {
        onScrollToTop();
      }
    };

    if (targetElement) {
      targetElement.addEventListener('scroll', handleScroll);

      return () => {
        targetElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, [ref, threshold, onScrollToTop]);
};
