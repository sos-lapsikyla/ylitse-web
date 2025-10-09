import { ModalCard, Modal } from '@/components/Modal';
import { useEscape } from '@/hooks/useEscape';
import Text from '@/components/Text';
//import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import LabeledInput from '@/components/LabeledInput';
import SkillsEditor from '@/features/ProfilePage/components/SkillsEditor';
import { DropdownMenu } from '@/components/Dropdown';
import styled from 'styled-components';

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
        <AccountInfo>
          <TextGroup>
            <Text variant="h2">{t('newUser.accountInfo.title')}</Text>
            <CaptionText variant="p">
              {t('newUser.accountInfo.caption')}
            </CaptionText>
          </TextGroup>
          <DropdownMenu
            options={options}
            placeholder={'Valitse rooli'}
            selectOption={() => console.log('todo')}
            label={t('newUser.accountInfo.accountType')}
          ></DropdownMenu>
          <LabeledInput
            label={t('newUser.accountInfo.username')}
            onChange={() => console.log('todo')}
            value={''}
          />
          <LabeledInput
            label={t('newUser.accountInfo.password')}
            onChange={() => console.log('todo')}
            value={''}
          />
          <LabeledInput
            label={t('newUser.accountInfo.passwordAgain')}
            onChange={() => console.log('todo')}
            value={''}
          />
          <LabeledInput
            label={t('newUser.accountInfo.email')}
            onChange={() => console.log('todo')}
            value={''}
          />
        </AccountInfo>
        <PublicInfo>
          <Text variant="h2">{t('newUser.publicInfo.title')}</Text>
          <LabeledInput
            label={t('newUser.publicInfo.displayName')}
            onChange={() => console.log('todo')}
            value={''}
          />
          <LabeledInput
            label={t('newUser.publicInfo.birthYear')}
            onChange={() => console.log('todo')}
            value={''}
          />
          <LabeledInput
            label={t('newUser.publicInfo.area')}
            onChange={() => console.log('todo')}
            value={''}
          />
          <LabeledInput
            label={t('newUser.publicInfo.story')}
            onChange={() => console.log('todo')}
            variant="textarea"
            rows={3}
            value={''}
          />
          <SkillsEditor
            updateSkills={() => console.log('')}
            skills={[]}
          ></SkillsEditor>
        </PublicInfo>
      </ModalCard>
    </Modal>
  );
};

const AccountInfo = styled.div`
  padding: 1rem 0;
`;

const PublicInfo = styled.div`
  padding: 2rem 0;
`;

const CaptionText = styled(Text)`
  margin: 0;
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export default NewUser;
