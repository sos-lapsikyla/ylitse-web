import Text from '@/components/Text';
import LabeledInput from '@/components/LabeledInput';
import SkillsEditor from '@/features/ProfilePage/components/SkillsEditor';
import { DropdownMenu } from '@/components/Dropdown';
import styled from 'styled-components';
import { UserFormData } from './useUserForm';
import { useTranslation } from 'react-i18next';

type Props = {
  formData: UserFormData;
  updateField: <K extends keyof UserFormData>(
    key: K,
    value: UserFormData[K],
  ) => void;
};

const UserForm: React.FC<Props> = ({ formData, updateField }) => {
  const { t } = useTranslation('users');
  const roleOptions = ['admin', 'mentee', 'mentor'];

  return (
    <>
      <AccountInfo>
        <TextGroup>
          <Text variant="h2">{t('newUser.accountInfo.title')}</Text>
          <CaptionText variant="p">
            {t('newUser.accountInfo.caption')}
          </CaptionText>
        </TextGroup>

        <DropdownMenu
          options={roleOptions}
          placeholder={t('newUser.accountInfo.accountType')}
          selectOption={role => updateField('role', role)}
          label={t('newUser.accountInfo.accountType')}
        />

        <LabeledInput
          label={t('newUser.accountInfo.username')}
          value={formData.username}
          onChange={value => updateField('username', value)}
        />

        <LabeledInput
          label={t('newUser.accountInfo.password')}
          type="password"
          value={formData.password}
          onChange={value => updateField('password', value)}
        />
        <LabeledInput
          label={t('newUser.accountInfo.passwordAgain')}
          type="password"
          value={formData.passwordAgain}
          onChange={value => updateField('passwordAgain', value)}
        />
        <LabeledInput
          label={t('newUser.accountInfo.email')}
          value={formData.email}
          onChange={value => updateField('email', value)}
        />
      </AccountInfo>

      <PublicInfo>
        <Text variant="h2">{t('newUser.publicInfo.title')}</Text>

        <LabeledInput
          label={t('newUser.publicInfo.displayName')}
          value={formData.displayName}
          onChange={value => updateField('displayName', value)}
        />
        <LabeledInput
          label={t('newUser.publicInfo.birthYear')}
          value={formData.birthYear}
          onChange={value => updateField('birthYear', value)}
        />
        <LabeledInput
          label={t('newUser.publicInfo.area')}
          value={formData.area}
          onChange={value => updateField('area', value)}
        />
        <LabeledInput
          label={t('newUser.publicInfo.story')}
          variant="textarea"
          rows={3}
          value={formData.story}
          onChange={value => updateField('story', value)}
        />
        <SkillsEditor
          updateSkills={skills => updateField('skills', skills)}
          skills={formData.skills}
        />
      </PublicInfo>
    </>
  );
};

// Styled components
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

export default UserForm;
