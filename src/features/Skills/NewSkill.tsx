import LabeledInput from '@/components/LabeledInput';
import { useAddSkillMutation } from './skillsApi';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { TextButton } from '@/components/Buttons';
import styled from 'styled-components';
import { palette } from '@/components/constants';
import { useTranslation } from 'react-i18next';

type Props = {
  setIsNewSkillOpen: Dispatch<SetStateAction<boolean>>;
};

const NewSkill: React.FC<Props> = ({ setIsNewSkillOpen }) => {
  const { t } = useTranslation('skills');
  const [addSkill] = useAddSkillMutation();
  const [skill, setSkill] = useState('');
  const [isAddDisabled, setIsAddDisabled] = useState(true);

  useEffect(() => {
    setIsAddDisabled(skill.length < 2);
  }, [skill]);

  // validate:
  // on jo listalla

  const handleAdd = async () => {
    const skillPayload = { name: skill };
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
