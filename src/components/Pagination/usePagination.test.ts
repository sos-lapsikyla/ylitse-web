import { renderHook } from '@testing-library/react';
import { THREE_DOTS, usePagination } from './usePagination';

describe('usePagination', () => {
  it('returns single page when totalCount fits in one page', () => {
    const { result } = renderHook(() =>
      usePagination({ totalCount: 5, pageSize: 10, currentPage: 1 }),
    );
    expect(result.current).toEqual([1]);
  });

  it('returns empty range when totalCount is 0', () => {
    const { result } = renderHook(() =>
      usePagination({ totalCount: 0, pageSize: 10, currentPage: 1 }),
    );
    expect(result.current).toEqual([]);
  });

  it('returns all pages when total pages fit within threshold', () => {
    const { result } = renderHook(() =>
      usePagination({ totalCount: 70, pageSize: 10, currentPage: 1 }),
    );
    expect(result.current).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('shows dots on the right when near the start', () => {
    const { result } = renderHook(() =>
      usePagination({ totalCount: 100, pageSize: 10, currentPage: 2 }),
    );
    expect(result.current).toEqual([1, 2, 3, THREE_DOTS, 10]);
  });

  it('shows dots on the left when near the end', () => {
    const { result } = renderHook(() =>
      usePagination({ totalCount: 100, pageSize: 10, currentPage: 9 }),
    );
    expect(result.current).toEqual([1, THREE_DOTS, 8, 9, 10]);
  });

  it('shows dots on both sides when in the middle', () => {
    const { result } = renderHook(() =>
      usePagination({ totalCount: 100, pageSize: 10, currentPage: 5 }),
    );
    expect(result.current).toEqual([1, THREE_DOTS, 4, 5, 6, THREE_DOTS, 10]);
  });

  it('respects custom siblingCount', () => {
    const { result } = renderHook(() =>
      usePagination({
        totalCount: 200,
        pageSize: 10,
        currentPage: 10,
        siblingCount: 2,
      }),
    );
    expect(result.current).toEqual([
      1,
      THREE_DOTS,
      8,
      9,
      10,
      11,
      12,
      THREE_DOTS,
      20,
    ]);
  });
});
