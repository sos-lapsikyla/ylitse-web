import { ModalCard, Modal } from '@/components/Modal';
import { useEscape } from '@/hooks/useEscape';
import Text from '@/components/Text';
//import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import LabeledInput from '@/components/LabeledInput';
import SkillsEditor from '@/features/ProfilePage/components/SkillsEditor';
import { DropdownMenu } from '@/components/Dropdown';

type Props = {
  onDismiss: () => void;
};

const NewUser: React.FC<Props> = ({ onDismiss }) => {
  const { t } = useTranslation('users');

  useEscape(() => onDismiss());

  const options = ['admin', 'mentee', 'mentor'];

  return (
    <Modal>
      <ModalCard title={t('newUser.title')} onDismiss={onDismiss}>
        <Text variant="h2">{t('newUser.h2')}</Text>
        <Text variant="p">{t('newUser.caption')}</Text>
        <DropdownMenu
          options={options}
          placeholder={'Valitse rooli'}
          selectOption={() => console.log('todo')}
          label={t('newUser.accountType')}
        ></DropdownMenu>
        <LabeledInput
          label={t('newUser.email')}
          onChange={() => console.log('todo')}
          value={''}
        />
        <Text variant="label">{t('newUser.visibility')}</Text>
        <Text variant="label">{t('newUser.hide')}</Text>
        <Text variant="h2">{t('newUser.publicInfo')}</Text>
        <LabeledInput
          label={t('newUser.displayName')}
          onChange={() => console.log('todo')}
          value={''}
        />
        <LabeledInput
          label={t('newUser.birthYear')}
          onChange={() => console.log('todo')}
          value={''}
        />
        <LabeledInput
          label={t('newUser.area')}
          onChange={() => console.log('todo')}
          value={''}
        />
        <LabeledInput
          label={t('newUser.story')}
          onChange={() => console.log('todo')}
          variant="textarea"
          rows={3}
          value={''}
        />

        <SkillsEditor
          updateSkills={() => console.log('')}
          skills={[]}
        ></SkillsEditor>
      </ModalCard>
    </Modal>
  );
};

// const ModalText = styled(Text)`
//   margin: 0;
// `;

// const TextGroup = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

export default NewUser;
