import LabeledInput from '@/components/LabeledInput';
import { useAddSkillMutation } from './skillsApi';
import { useState } from 'react';
import { TextButton } from '@/components/Buttons';

const NewSkill = () => {
  const [addSkill] = useAddSkillMutation();
  const [skill, setSkill] = useState('');

  // validate:
  // liian lyhyt (alle 2 merkkiä)
  // on jo listalla

  const handleAdd = async () => {
    const skillPayload = { name: skill };
    try {
      await addSkill(skillPayload).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <LabeledInput
        label={''}
        onChange={value => setSkill(value)}
        value={skill}
      />
      <TextButton onClick={() => void handleAdd}>Lisää</TextButton>
    </>
  );
};

export default NewSkill;
