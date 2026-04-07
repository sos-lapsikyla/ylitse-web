import { useMemo } from 'react';

type Pagination = {
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  currentPage: number;
};

export const THREE_DOTS = '...';

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}: Pagination) => {
  const paginationRange = useMemo(() => {
    const totalPages = Math.ceil(totalCount / pageSize);
    const totalPageNumbers = 2 * siblingCount + 5;

    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
    const shouldShowLeftDots = leftSiblingIndex > 1;
    const shouldShowRightDots = rightSiblingIndex < totalPages;
    const firstPageIndex = 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 1 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, THREE_DOTS, totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 1 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [firstPageIndex, THREE_DOTS, ...rightRange];
    }

    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [firstPageIndex, THREE_DOTS, ...middleRange, THREE_DOTS, totalPages];
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};
