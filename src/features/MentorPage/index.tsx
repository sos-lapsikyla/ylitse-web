import { useState } from 'react';

import { type Mentor } from './models';
import { useGetMentorsQuery } from './mentorPageApi';
import { selectFilteredMentors } from './selectors';
import { useAppSelector } from '@/store';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import Spinner from '@/components/Spinner';
import MentorsFilter from './components/MentorsFilter';
import MentorList from './components/MentorList';
import MentorCard from './components/MentorList/MentorCard/Expanded';
import styled from 'styled-components';
import {
  breakpoints,
  CONTENT_WIDTH,
  OUTER_VERTICAL_MARGIN,
  spacing,
} from '@/components/constants';

const MentorPage = () => {
  const { isMobile } = useGetLayoutMode();
  const { isLoading } = useGetMentorsQuery();
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const mentors = useAppSelector(selectFilteredMentors());

  const PageContent = isLoading ? (
    <Spinner variant="large" />
  ) : (
    <>
      {selectedMentor && (
        <MentorCard
          mentor={selectedMentor}
          onDismiss={() => setSelectedMentor(null)}
        />
      )}
      <MentorsFilter />
      <MentorList setVisibleCard={setSelectedMentor} mentors={mentors} />
    </>
  );

  return isMobile ? PageContent : <PageContainer>{PageContent}</PageContainer>;
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${OUTER_VERTICAL_MARGIN} auto;
  max-width: ${CONTENT_WIDTH};
  width: ${CONTENT_WIDTH};

  @media screen and (max-width: 1500px) {
    max-width: calc(100vw - (${spacing.layout_spacing} * 2));
    width: 1130px;
  }
  @media screen and (max-width: ${breakpoints.mobile}) {
    flex: 1;
  }
`;

export default MentorPage;
