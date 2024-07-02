import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Mentor,
  selectNewestMentors,
  useGetMentorsQuery,
} from '@/features/MentorPage/mentorPageApi';
import { useAppSelector } from '@/store';

import ListCard from '@/features/MentorPage/components/MentorList/MentorCard/List';
import MentorCard from '@/features/MentorPage/components/MentorList/MentorCard/Expanded';
import { OUTER_HORIZONTAL_MARGIN, palette } from '@/components/variables';
import Text from '@/components/Text';
import { TextButton } from '@/components/Buttons';

const NewestMentors = () => {
  const { t } = useTranslation('home');
  const navigate = useNavigate();
  const navigateToMentors = () => navigate('/mentors');

  const { isLoading } = useGetMentorsQuery();
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const mentors = useAppSelector(selectNewestMentors(2));

  return (
    <Container>
      <Title variant="h2">{t('newestMentors.title')}</Title>
      <MentorContainer>
        {!isLoading && (
          <MentorCards>
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
        <FindMentorContainer>
          <TextContainer>
            <Text variant="h2" color="white">
              {t('newestMentors.info.title')}
            </Text>
            <Text color="white">{t('newestMentors.info.text')}</Text>
            <Button variant="outline" onClick={navigateToMentors}>
              {t('newestMentors.info.button')}
            </Button>
          </TextContainer>
        </FindMentorContainer>
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

const Title = styled(Text)`
  color: ${palette.white};
`;

const MentorContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 2rem;
  justify-content: space-between;
`;

const MentorCards = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const FindMentorContainer = styled.div`
  align-items: center;
  background-color: ${palette.purple};
  border-radius: 10px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 50%;
  min-height: 26rem;
  padding: 4rem;
`;

const TextContainer = styled.div`
  align-items: center;
  color: ${palette.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const Button = styled(TextButton)`
  margin-top: 1rem;
`;

export default NewestMentors;
