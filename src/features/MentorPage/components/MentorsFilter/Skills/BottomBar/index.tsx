import { resetFilters } from '@/features/MentorPage/mentorsFilterSlice';
import { useAppDispatch } from '@/store';

import { usePagination } from './usePagination';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { PageButton } from './PageButton';
import { Button, IconButton } from '@/components/Buttons';
import { DropdownMenu } from '@/components/Dropdown';
import { pageSizes } from '../constants';

type Props = {
  skillTotalAmount: number;
  currentPage: number;
  setCurrentPage: (next: number) => void;
  skillsInPage: number;
  setSkillsInPage: (next: number) => void;
};

export const BottomBar = ({
  skillTotalAmount,
  setCurrentPage,
  currentPage,
  skillsInPage,
  setSkillsInPage,
}: Props) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('mentors');

  const paginationRange = usePagination({
    currentPage,
    pageSize: skillsInPage,
    totalCount: skillTotalAmount,
  });

  const handleReset = () => {
    dispatch(resetFilters());
  };

  const handleSetPageSize = (nextSize: number) => {
    // when changing page-size, we reset the page
    setSkillsInPage(nextSize);
    setCurrentPage(1);
  };

  const isLastPage = currentPage === paginationRange?.slice(-1)[0];
  const isFirstPage = currentPage === paginationRange?.[0];
  const isPaginated = paginationRange ? paginationRange.length > 1 : false;

  return (
    <Container>
      <Button
        leftIcon="delete"
        onClick={handleReset}
        sizeInPx={20}
        text={{
          color: 'redDark',
          text: t('filters.clear'),
          variant: 'boldBaloo',
        }}
      />

      <PaginationContainer>
        {!isFirstPage && (
          <Prev
            variant="prev"
            sizeInPx={28}
            onClick={() => setCurrentPage(currentPage - 1)}
          />
        )}

        {isPaginated &&
          paginationRange?.map((page, index) => (
            <PageButton
              key={`${page}_${index}`}
              isSelected={currentPage === page}
              page={page}
              onClick={() => setCurrentPage(Number(page))}
            />
          ))}
        {!isLastPage && (
          <Next
            variant="next"
            sizeInPx={28}
            onClick={() => setCurrentPage(currentPage + 1)}
          />
        )}
      </PaginationContainer>

      <PageSizeDropdown
        skillsInPage={skillsInPage}
        setSkillsInPage={handleSetPageSize}
      />
    </Container>
  );
};

const Container = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: space-between;
  padding-top: 0.5rem;
  width: 100%;
`;

const PageSizeDropdown = ({
  skillsInPage,
  setSkillsInPage,
}: {
  skillsInPage: number;
  setSkillsInPage: (next: number) => void;
}) => {
  const { t } = useTranslation('mentors');
  return (
    <DropdownMenu
      variant="inline"
      options={pageSizes}
      value={skillsInPage}
      onChange={value => value !== undefined && setSkillsInPage(value)}
      label={t('filters.pageSizeLabel')}
    />
  );
};

const PaginationContainer = styled.div`
  display: flex;
  width: fit-content;
`;

const Next = styled(IconButton)`
  margin-left: 0.5rem;
`;

const Prev = styled(IconButton)`
  margin-right: 0.5rem;
`;

export default BottomBar;
