import styled, { css } from 'styled-components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Mentor,
  selectNewestMentors,
  useGetMentorsQuery,
} from '@/features/MentorPage/mentorPageApi';
import { useAppSelector } from '@/store';

import FindMentor from '@/features/HomePage/components/FindMentor';
import ListCard from '@/features/MentorPage/components/MentorList/MentorCard/List';
import MentorCard from '@/features/MentorPage/components/MentorList/MentorCard/Expanded';
import { OUTER_HORIZONTAL_MARGIN, palette } from '@/components/variables';
import Text from '@/components/Text';

type Props = {
  isMobile?: boolean;
};

const NewestMentors = ({ isMobile = false }: Props) => {
  const { t } = useTranslation('home');

  const { isLoading } = useGetMentorsQuery();
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const mentors = useAppSelector(selectNewestMentors(2));

  return (
    <Container>
      <Title variant="h2" isMobile={isMobile}>
        {t('newestMentors.title')}
      </Title>
      <MentorContainer>
        {!isLoading && (
          <MentorCards isMobile={isMobile}>
            {selectedMentor && (
              <MentorCard
                mentor={selectedMentor}
                onDismiss={() => setSelectedMentor(null)}
              />
            )}
            {mentors.map(mentor => (
              <ListCard
                key={mentor.buddyId}
                isHomePage
                mentor={mentor}
                setVisibleCard={() => setSelectedMentor(mentor)}
              />
            ))}
          </MentorCards>
        )}
        {!isMobile && <FindMentor />}
      </MentorContainer>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${palette.blueWhite};
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 4rem ${OUTER_HORIZONTAL_MARGIN};
`;

const Title = styled(Text)<{ isMobile: boolean }>`
  ${({ isMobile }) =>
    isMobile &&
    css`
      align-self: center;
    `}
`;

const MentorContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 2rem;
  justify-content: space-between;
`;

const MentorCards = styled.div<{ isMobile: boolean }>`
  display: flex;
  gap: 1.5rem;

  ${({ isMobile }) =>
    isMobile &&
    css`
      flex: 1;
      overflow: auto;
      scroll-snap-type: x mandatory;
      white-space: nowrap;
      &::-webkit-scrollbar {
        display: none;
      }
    `}
`;

export default NewestMentors;
