import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { palette } from '@/components/constants';
import LabeledInput from '@/components/LabeledInput';
import { TextButton } from '@/components/Buttons';

import { useAddSkillMutation } from './skillsApi';
import { useAppSelector } from '@/store';
import { selectAllSkills } from './selectors';
import toast from 'react-hot-toast';

type Props = {
  setIsNewSkillOpen: Dispatch<SetStateAction<boolean>>;
};

const NewSkill: React.FC<Props> = ({ setIsNewSkillOpen }) => {
  const { t } = useTranslation('skills');
  const [addSkill] = useAddSkillMutation();
  const [skill, setSkill] = useState('');
  const [isAddDisabled, setIsAddDisabled] = useState(true);
  const allSkills = useAppSelector(selectAllSkills());

  useEffect(() => {
    setIsAddDisabled(skill.length < 2);
  }, [skill]);

  const handleAdd = async () => {
    const skillPayload = { name: skill };

    const alreadyExists = Object.values(allSkills).some(
      s => s.name.toLowerCase() === skillPayload.name.toLowerCase(),
    );

    if (alreadyExists) {
      toast.error(t('newSkill.alreadyExists'));
      return;
    }
    try {
      await addSkill(skillPayload).unwrap();
      setSkill('');
    } catch (err) {
      console.log(err);
    }
  };
  // add skill with enter-button
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      void handleAdd();
    }
  };

  return (
    <Container>
      <LabeledInput
        label={t('newSkill.title')}
        onChange={value => setSkill(value)}
        value={skill}
        onKeyDown={handleKeyDown}
      />
      <ButtonContainer>
        <TextButton
          onClick={() => setIsNewSkillOpen(false)}
          variant="outlinePurple"
        >
          {t('newSkill.close')}
        </TextButton>
        <TextButton
          variant={isAddDisabled ? 'disabled' : 'dark'}
          onClick={() => void handleAdd()}
        >
          {t('newSkill.add')}
        </TextButton>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${palette.blueLight};
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: space-between;
`;

export default NewSkill;
