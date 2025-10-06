import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import {
  changeSearchString,
  selectSearchString,
} from '@/features/MentorPage/mentorsFilterSlice';
import { selectSkills } from '@/features/MentorPage/selectors';
import { useAppSelector, useAppDispatch } from '@/store';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import DesktopSearch from './MentorSearch';
import MobileSearch from './MobileSearch';
import { palette } from '@/components/constants';
import Skills from './Skills';
import { Text } from '@/components/Text/Text';

const MentorsFilter = () => {
  const [isSkillFilterExpanded, setIsSKillFilterExpanded] = useState(false);
  const skills = useAppSelector(selectSkills());
  const searchString = useAppSelector(selectSearchString);

  const dispatch = useAppDispatch();

  const handleSearchStringChange = (value: string) =>
    dispatch(changeSearchString(value));

  const { t } = useTranslation('mentors');
  const { isMobile } = useGetLayoutMode();

  return isMobile ? (
    <MobileFilters>
      <MobileSearch
        isExpanded={isSkillFilterExpanded}
        toggleExpanded={setIsSKillFilterExpanded}
        searchString={searchString}
        onSearchStringChange={handleSearchStringChange}
      />
      {isSkillFilterExpanded && (
        <>
          <MobileDivider />
          <Skills skills={skills} />
        </>
      )}
    </MobileFilters>
  ) : (
    <>
      <PageHeader>
        <Text variant="h1">{t('title')}</Text>
      </PageHeader>
      <Filters>
        <DesktopSearch
          isExpanded={isSkillFilterExpanded}
          toggleExpanded={setIsSKillFilterExpanded}
          searchString={searchString}
          onSearchStringChange={handleSearchStringChange}
        />
        {isSkillFilterExpanded && (
          <>
            <Divider />
            <Skills skills={skills} />
          </>
        )}
      </Filters>
    </>
  );
};

const Filters = styled.div`
  position: relative;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 1rem 2.5rem;
  width: 100%;
  height: auto;
  padding: 2.5rem 0;
  margin: 0;
  background-color: ${palette.white};
  border-radius: 10px;
`;

const MobileFilters = styled.div`
  position: relative;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 1rem 2.5rem;
  width: 100%;
  height: auto;
  padding: 0;
  margin: 0;
  background-color: ${palette.white};
  border-radius: 10px;
`;

const MobileDivider = styled.div`
  margin: -2rem 0 1rem;
  border-bottom: solid 1px ${palette.purplePale};
`;

const Divider = styled.div`
  margin: 1rem 6% 0;
  border-bottom: solid 1px ${palette.purplePale};
`;

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  max-height: 80px;
  margin-bottom: 1rem;
  background-color: ${palette.blue2};
  border-radius: 10px;
`;

export default MentorsFilter;
