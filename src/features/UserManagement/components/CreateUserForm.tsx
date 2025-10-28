import Text from '@/components/Text';
import LabeledInput from '@/components/LabeledInput';
import { DropdownMenu } from '@/components/Dropdown';
import styled from 'styled-components';
import { UserFormData } from './useUserForm';
import { useTranslation } from 'react-i18next';
import {
  isDisplayNameTooLong,
  isDisplayNameTooShort,
  isPasswordTooShort,
  isRegionTooLong,
  isStoryTooLong,
  validateBirthYear,
  validateEmail,
} from '@/features/ProfilePage/validators';
import { Languages } from '@/components/constants';
import { useAppSelector } from '@/store';
import { selectAllSkillOptions } from '@/features/MentorPage/selectors';
import ChipsEditor from '@/components/ChipsEditor';

type Props = {
  formData: UserFormData;
  updateField: <K extends keyof UserFormData>(
    key: K,
    value: UserFormData[K],
  ) => void;
};

const UserForm: React.FC<Props> = ({ formData, updateField }) => {
  const { t } = useTranslation('users');
  const roleOptions = [
    { text: t('newUser.accountInfo.role.roleOptions.admin'), value: 'admin' },
    { text: t('newUser.accountInfo.role.roleOptions.mentee'), value: 'mentee' },
    { text: t('newUser.accountInfo.role.roleOptions.mentor'), value: 'mentor' },
  ];
  const genderOptions = [
    { text: t('newUser.publicInfo.gender.options.female'), value: 'female' },
    { text: t('newUser.publicInfo.gender.options.male'), value: 'male' },
    { text: t('newUser.publicInfo.gender.options.other'), value: 'other' },
  ];

  const allLanguages = Languages.map(lang => lang.name);
  const allSkills = useAppSelector(selectAllSkillOptions());

  const shouldShowMentorFields = formData.role !== 'mentor';

  // validate form

  const getLoginNameError = (): string | null => {
    const name = formData.username?.trim();
    if (!name) return null;
    if (isDisplayNameTooLong(name)) {
      return t('newUser.accountInfo.username.tooLongError');
    }
    if (isDisplayNameTooShort(name)) {
      return t('newUser.accountInfo.username.tooShortError');
    }
    return null;
  };

  const getPasswordError = (): string | null => {
    const password = formData.password?.trim();
    if (!password) return null;
    if (isPasswordTooShort(password, true)) {
      return t('newUser.accountInfo.password.tooShortError');
    }
    return null;
  };

  const getDifferentPasswordsError = (): string | null => {
    const passwordAgain = formData.passwordAgain?.trim();
    if (!passwordAgain) return null;
    if (formData.password !== formData.passwordAgain) {
      return t('newUser.accountInfo.password.differentPasswords');
    }
    return null;
  };

  const getEmailError = (): string | null => {
    const email = formData.email?.trim();
    if (!email) return null;
    return validateEmail(email) ? null : t('newUser.accountInfo.invalidEmail');
  };

  const getDisplayNameError = (): string | null => {
    const name = formData.displayName?.trim();
    if (!name) return null;
    if (isDisplayNameTooLong(name)) {
      return t('newUser.publicInfo.displayName.tooLongError');
    }
    if (isDisplayNameTooShort(name)) {
      return t('newUser.publicInfo.displayName.tooShortError');
    }
    return null;
  };

  const getBirthYearError = (): string | null => {
    const year = formData.birthYear;
    if (!year) return null;
    return validateBirthYear(Number(year))
      ? null
      : t('newUser.publicInfo.birthYear.invalidError');
  };

  const getRegionError = (): string | null => {
    const region = formData.area?.trim();
    if (!region) return null;
    return isRegionTooLong(region)
      ? t('newUser.publicInfo.area.tooLongError')
      : null;
  };

  const getStoryError = (): string | null => {
    const story = formData.story?.trim();
    if (!story) return null;
    return isStoryTooLong(story)
      ? t('newUser.publicInfo.story.tooLongError')
      : null;
  };

  return (
    <>
      <AccountInfo>
        <TextGroup>
          <TitleText>
            <Text variant="h2">{t('newUser.accountInfo.title')}</Text>
          </TitleText>
          <CaptionText variant="p">
            {t('newUser.accountInfo.caption')}
          </CaptionText>
        </TextGroup>

        <DropdownMenu
          options={roleOptions.map(o => o.text)}
          placeholder={t('newUser.accountInfo.role.choose')}
          defaultOption={t('newUser.accountInfo.role.roleOptions.mentor')}
          selectOption={(selectedText: string) => {
            const selectedOption = roleOptions.find(
              o => o.text === selectedText,
            );
            if (selectedOption) {
              updateField('role', selectedOption.value);
            }
          }}
          label={t('newUser.accountInfo.role.title')}
        />

        <LabeledInput
          error={getLoginNameError()}
          label={t('newUser.accountInfo.username.label')}
          value={formData.username}
          onChange={value => updateField('username', value)}
        />

        <LabeledInput
          error={getPasswordError()}
          label={t('newUser.accountInfo.password.label')}
          type="password"
          value={formData.password}
          onChange={value => updateField('password', value)}
          tooltip={t('newUser.accountInfo.password.passwordTooltip')}
        />
        <LabeledInput
          error={getDifferentPasswordsError()}
          label={t('newUser.accountInfo.password.passwordRepeat')}
          type="password"
          value={formData.passwordAgain}
          onChange={value => updateField('passwordAgain', value)}
        />
        <LabeledInput
          error={getEmailError()}
          label={t('newUser.accountInfo.email')}
          value={formData.email}
          onChange={value => updateField('email', value)}
        />
      </AccountInfo>

      <PublicInfo>
        <TitleText>
          <Text variant="h2">{t('newUser.publicInfo.title')}</Text>
        </TitleText>
        <LabeledInput
          error={getDisplayNameError()}
          label={t('newUser.publicInfo.displayName.label')}
          value={formData.displayName}
          onChange={value => updateField('displayName', value)}
        />
        <LabeledInput
          error={getBirthYearError()}
          label={
            formData.role === 'mentor'
              ? t('newUser.publicInfo.birthYear.labelMentor')
              : t('newUser.publicInfo.birthYear.label')
          }
          value={String(formData.birthYear)}
          onChange={value => updateField('birthYear', value)}
        />
        {!shouldShowMentorFields && (
          <>
            <DropdownMenu
              options={genderOptions.map(o => o.text)}
              placeholder={t('newUser.publicInfo.gender.choose')}
              selectOption={(selectedText: string) => {
                const selectedOption = genderOptions.find(
                  o => o.text === selectedText,
                );
                if (selectedOption) {
                  updateField('gender', selectedOption.value);
                }
              }}
              label={
                formData.role === 'mentor'
                  ? t('newUser.publicInfo.gender.labelMentor')
                  : t('newUser.publicInfo.gender.label')
              }
            />

            <LabeledInput
              error={getRegionError()}
              label={t('newUser.publicInfo.area.label')}
              value={formData.area}
              onChange={value => updateField('area', value)}
            />

            <LabeledInput
              error={getStoryError()}
              label={t('newUser.publicInfo.story.label')}
              variant="textarea"
              rows={3}
              value={formData.story}
              onChange={value => updateField('story', value)}
            />
            <ChipsEditor
              updateChips={skills => updateField('skills', skills)}
              chips={formData.skills}
              allOptions={allSkills}
              placeholder={t('newUser.publicInfo.newSkill')}
              label={t('newUser.publicInfo.skills')}
            ></ChipsEditor>
            <ChipsEditor
              updateChips={languages => updateField('languages', languages)}
              chips={formData.languages}
              allOptions={allLanguages}
              placeholder={t('newUser.publicInfo.newLanguage')}
              label={t('newUser.publicInfo.languages')}
            ></ChipsEditor>
          </>
        )}
      </PublicInfo>
    </>
  );
};

const AccountInfo = styled.div`
  padding: 0 0 1rem 0;
`;
const CaptionText = styled(Text)`
  margin: -1rem 0 1rem 0;
`;
const PublicInfo = styled.div`
  padding: 0 0 6rem 0;
`;
const TitleText = styled(Text)`
  margin: 1rem 0;
`;
const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export default UserForm;
