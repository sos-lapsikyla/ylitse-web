import { useState } from 'react';

import { type Mentor } from './models';
import { useGetMentorsQuery } from './mentorPageApi';
import { selectFilteredMentors } from './selectors';
import { useAppSelector } from '@/store';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import PageWithTransition from '@/components/PageWithTransition';
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

  return (
    <PageWithTransition>
      {isMobile ? PageContent : <PageContainer>{PageContent}</PageContainer>}
    </PageWithTransition>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${CONTENT_WIDTH};
  max-width: ${CONTENT_WIDTH};
  margin: ${OUTER_VERTICAL_MARGIN} auto;

  @media screen and (width <= 1500px) {
    width: 1130px;
    max-width: calc(100vw - (${spacing.layout_spacing} * 2));
  }

  @media screen and (max-width: ${breakpoints.mobile}) {
    flex: 1;
  }
`;

export default MentorPage;
