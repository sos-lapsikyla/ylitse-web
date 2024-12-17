import styled, { css } from 'styled-components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { type Mentor } from '@/features/MentorPage/models';
import { useGetMentorsQuery } from '@/features/MentorPage/mentorPageApi';
import { selectNewestMentors } from '@/features/MentorPage/selectors';
import { useAppSelector } from '@/store';

import FindMentor from '@/features/HomePage/components/FindMentor';
import ListCard from '@/features/MentorPage/components/MentorList/MentorCard/List';
import MentorCard from '@/features/MentorPage/components/MentorList/MentorCard/Expanded';
import { OUTER_HORIZONTAL_MARGIN, palette } from '@/components/constants';
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
    <Container isMobile={isMobile}>
      {isMobile ? (
        <>
          <Title variant="h2" isMobile={isMobile}>
            {t('newestMentors.title')}
          </Title>
          <MentorContainer>
            {selectedMentor && (
              <MentorCard
                mentor={selectedMentor}
                onDismiss={() => setSelectedMentor(null)}
              />
            )}
            {!isLoading && (
              <MentorCards isMobile={isMobile}>
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
          </MentorContainer>
        </>
      ) : (
        <>
          <LeftContainer>
            <Title variant="h2" isMobile={isMobile}>
              {t('newestMentors.title')}
            </Title>
            <MentorContainer>
              {selectedMentor && (
                <MentorCard
                  mentor={selectedMentor}
                  onDismiss={() => setSelectedMentor(null)}
                />
              )}
              {!isLoading && (
                <MentorCards isMobile={isMobile}>
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
            </MentorContainer>
          </LeftContainer>
          <FindMentor />
        </>
      )}
    </Container>
  );
};

const Container = styled.div<{ isMobile: boolean }>`
  background-color: ${palette.blueWhite};
  display: flex;
  flex-direction: ${props => (props.isMobile ? 'column' : 'row')};
  gap: 2rem;
  justify-content: center;
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
      gap: 1.5rem;
      margin: auto -1rem auto -1rem;
      overflow: auto;
      scroll-snap-type: x mandatory;
      white-space: nowrap;
      &::-webkit-scrollbar {
        display: none;
      }
    `}
`;

const LeftContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export default NewestMentors;
