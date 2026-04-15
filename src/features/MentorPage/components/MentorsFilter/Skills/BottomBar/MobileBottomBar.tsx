import {
  resetFilters,
  selectSelectedSkills,
} from '@/features/MentorPage/mentorsFilterSlice';
import { useAppDispatch, useAppSelector } from '@/store';

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

export const MobileBottomBar = ({
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

  const selectedSkills = useAppSelector(selectSelectedSkills);
  const shouldShowRemoveFiltersButton = selectedSkills.length !== 0;

  return (
    <Container>
      <Pagination
        totalCount={skillTotalAmount}
        currentPage={currentPage}
        pageSize={skillsInPage}
        onPageChange={setCurrentPage}
      />

      <DropdownMenu
        variant="inline"
        options={pageSizes}
        value={skillsInPage}
        onChange={value => value !== undefined && handleSetPageSize(value)}
        label={t('filters.pageSizeLabel')}
      />
      {shouldShowRemoveFiltersButton && (
        <ButtonContainer>
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
        </ButtonContainer>
      )}
    </Container>
  );
};

const ButtonContainer = styled.div`
  padding: 0.5rem;
`;

const Container = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.7rem;
  justify-content: center;
  padding-bottom: 2rem;
  padding-top: 0.5rem;
  width: 100%;
`;

export default MobileBottomBar;
