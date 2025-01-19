import { useState, useEffect } from 'react';

export const useBottomAction = (
  parentRef: React.RefObject<HTMLDivElement>,
  childRef: React.RefObject<HTMLDivElement>,
  offsets = { bottom: 20, right: 20 },
) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updatePosition = () => {
      if (!parentRef.current || !childRef.current) return;

      const parentRect = parentRef.current.getBoundingClientRect();
      const { bottom, right } = offsets;

      childRef.current.style.position = 'fixed';
      childRef.current.style.bottom = `${window.innerHeight - parentRect.bottom + bottom}px`;
      childRef.current.style.right = `${window.innerWidth - parentRect.right + right}px`;

      const { scrollTop, scrollHeight, clientHeight } = parentRef.current;
      setIsScrolled(scrollTop + clientHeight >= scrollHeight - 10);
    };

    updatePosition();

    const parent = parentRef.current;
    parent?.addEventListener('scroll', updatePosition);

    window.addEventListener('resize', updatePosition);

    return () => {
      parent?.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [parentRef, childRef, offsets]);

  useEffect(() => {
    handleBottomActionClick();
  }, []);

  const handleBottomActionClick = () => {
    if (parentRef.current) {
      parentRef.current.scrollTo({
        top: parentRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  return { isScrolled, handleBottomActionClick };
};
