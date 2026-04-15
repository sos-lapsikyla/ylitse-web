import { resetFilters } from '@/features/MentorPage/mentorsFilterSlice';
import { useAppDispatch } from '@/store';

import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { Button } from '@/components/Buttons';
import { DropdownMenu } from '@/components/Dropdown';
import { Pagination } from '@/components/Pagination';
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

  const handleReset = () => {
    dispatch(resetFilters());
  };

  const handleSetPageSize = (nextSize: number) => {
    // when changing page-size, we reset the page
    setSkillsInPage(nextSize);
    setCurrentPage(1);
  };

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

      <Pagination
        totalCount={skillTotalAmount}
        currentPage={currentPage}
        pageSize={skillsInPage}
        onPageChange={setCurrentPage}
      />

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

export default BottomBar;
