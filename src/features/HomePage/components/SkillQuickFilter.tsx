import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { useGetMentorsQuery } from '@/features/MentorPage/mentorPageApi';
import { selectPopularSkills } from '@/features/MentorPage/selectors';
import {
  toggleSkill,
  resetFilters,
} from '@/features/MentorPage/mentorsFilterSlice';
import { useAppDispatch, useAppSelector } from '@/store';

import { Chip } from '@/components/Chip';
import { TextButton } from '@/components/Buttons';
import Text from '@/components/Text';
import { NAVIGATION_HEIGHT, palette } from '@/components/constants';

const POPULAR_SKILLS_COUNT = 12;

const SkillQuickFilter = () => {
  const { t } = useTranslation('home');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading } = useGetMentorsQuery();
  const popularSkillsSelector = useMemo(
    () => selectPopularSkills(POPULAR_SKILLS_COUNT),
    [],
  );
  const popularSkills = useAppSelector(popularSkillsSelector);

  const [selectedSkills, setSelectedSkills] = useState<Array<string>>([]);

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill],
    );
  };

  const handleNavigate = () => {
    dispatch(resetFilters());
    selectedSkills.forEach(skill => dispatch(toggleSkill(skill)));
    navigate('/mentors');
  };

  if (isLoading || popularSkills.length === 0) return null;

  return (
    <Container>
      <DecorativeBar />
      <Title variant="h2">{t('skillQuickFilter.title')}</Title>
      <Description>{t('skillQuickFilter.description')}</Description>
      <ChipContainer>
        {popularSkills.map(skill => (
          <Chip
            key={skill}
            text={skill}
            isSelected={selectedSkills.includes(skill)}
            onToggle={handleSkillToggle}
            showClose={false}
          />
        ))}
      </ChipContainer>
      <TextButton variant="dark" size="large" onClick={handleNavigate}>
        {t('skillQuickFilter.button')}
      </TextButton>
    </Container>
  );
};

const Container = styled.div`
  align-items: center;
  background-color: ${palette.blue2};
  border-bottom-right-radius: 333px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: calc(37rem - ${NAVIGATION_HEIGHT} - 2rem);
  left: 6rem;
  max-width: 26rem;
  padding: 5rem 3.5rem 1rem 3rem;
  position: absolute;
  text-align: center;
  top: 3rem;

  @media only screen and (max-width: 1920px) {
    left: 6vw;
  }
`;

const DecorativeBar = styled.div`
  background-color: ${palette.purpleDark};
  height: 4px;
  left: -3rem;
  position: absolute;
  top: 8.5rem;
  width: 79px;
`;

const Title = styled(Text)`
  margin-bottom: 0;
`;

const Description = styled(Text)`
  margin-top: 0;
`;

const ChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 1.25rem;
`;

export default SkillQuickFilter;
