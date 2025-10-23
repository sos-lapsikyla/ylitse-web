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
};

const SkillsEditor = ({ updateSkills, skills }: Props) => {
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
      <LabelText variant="label">{t('newUser.publicInfo.skills')}</LabelText>
      {skills.length > 0 && (
        <Skills>
          {skills.map(skill => (
            <Chip key={skill} text={skill} onToggle={removeSkill} />
          ))}
        </Skills>
      )}
      <DropdownSearch
        isDropdownVisible={isDropdownVisible}
        options={skillOptions}
        placeholder={t('newUser.publicInfo.newSkill')}
        selectOption={addSkill}
        setIsDropdownVisible={setIsDropdownVisible}
      />
    </Column>
  );
};

const LabelText = styled(Text)`
  margin: 0 0 -0.6rem 0;
`;

const Skills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;

export default SkillsEditor;
