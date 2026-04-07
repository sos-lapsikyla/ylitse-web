import styled from 'styled-components';
import { IconButton } from '@/components/Buttons';
import { PageButton } from './PageButton';
import { usePagination } from './usePagination';

type Props = {
  totalCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
};

export const Pagination = ({
  totalCount,
  currentPage,
  pageSize,
  onPageChange,
  siblingCount,
}: Props) => {
  const paginationRange = usePagination({
    currentPage,
    pageSize,
    totalCount,
    siblingCount,
  });

  const isLastPage = currentPage === paginationRange.slice(-1)[0];
  const isFirstPage = currentPage === paginationRange[0];
  const isPaginated = paginationRange.length > 1;

  if (!isPaginated) return null;

  return (
    <Container>
      {!isFirstPage && (
        <Prev
          variant="prev"
          sizeInPx={28}
          onClick={() => onPageChange(currentPage - 1)}
        />
      )}

      {paginationRange.map((page, index) => (
        <PageButton
          key={`${page}_${index}`}
          isSelected={currentPage === page}
          page={page}
          onClick={() => onPageChange(Number(page))}
        />
      ))}

      {!isLastPage && (
        <Next
          variant="next"
          sizeInPx={28}
          onClick={() => onPageChange(currentPage + 1)}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  align-items: center;
  display: flex;
  width: fit-content;
`;

const Next = styled(IconButton)`
  margin-left: 0.5rem;
`;

const Prev = styled(IconButton)`
  margin-right: 0.5rem;
`;
