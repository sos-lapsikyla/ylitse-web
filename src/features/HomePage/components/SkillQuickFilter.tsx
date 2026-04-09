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

const POPULAR_SKILLS_COUNT = 8;

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
      <Text variant="h1" color="white">
        {t('skillQuickFilter.title')}
      </Text>
      <Text color="white">{t('skillQuickFilter.description')}</Text>
      <ChipContainer>
        {popularSkills.map(skill => (
          <Chip
            key={skill}
            text={skill}
            isSelected={selectedSkills.includes(skill)}
            onToggle={handleSkillToggle}
          />
        ))}
      </ChipContainer>
      <TextButton variant="outlineOrange" size="large" onClick={handleNavigate}>
        {t('skillQuickFilter.button')}
      </TextButton>
    </Container>
  );
};

const Container = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.35);
  border-radius: 10px;
  bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  left: 50%;
  max-width: 90%;
  padding: 1.5rem 2rem;
  position: absolute;
  transform: translateX(-50%);
  width: max-content;
`;

const ChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
`;

export default SkillQuickFilter;
