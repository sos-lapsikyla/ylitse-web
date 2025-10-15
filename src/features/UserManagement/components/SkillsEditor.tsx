import styled from 'styled-components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { selectAllSkillOptions } from '@/features/MentorPage/selectors';
import { useAppSelector } from '@/store';

import { Chip } from '@/components/Chip';
import { Column } from '@/components/common';
import DropdownSearch from '@/components/DropdownSearch/DropdownSearch';
import Text from '@/components/Text';

type Props = {
  updateSkills: (skills: string[]) => void;
  skills: string[];
  isDisabled: boolean;
};

const SkillsEditor = ({ updateSkills, skills, isDisabled }: Props) => {
  const { t } = useTranslation('users');

  const allSkills = useAppSelector(selectAllSkillOptions());
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const addSkill = (skill: string) => {
    setIsDropdownVisible(false);
    updateSkills([...skills, skill]);
  };

  const removeSkill = (skill: string) => {
    setIsDropdownVisible(false);
    updateSkills(skills.filter(s => s !== skill));
  };

  const skillOptions = allSkills.filter(skill => !skills.includes(skill));

  return (
    <Column>
      <Text variant="label">{t('newUser.publicInfo.skills')}</Text>
      <Skills>
        {skills.map(skill => (
          <Chip key={skill} text={skill} onToggle={removeSkill} />
        ))}
      </Skills>
      <DropdownSearch
        isDisabled={isDisabled}
        isDropdownVisible={isDropdownVisible}
        options={skillOptions}
        placeholder={t('newUser.publicInfo.newSkill')}
        selectOption={addSkill}
        setIsDropdownVisible={setIsDropdownVisible}
      />
    </Column>
  );
};

const Skills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
`;

export default SkillsEditor;
