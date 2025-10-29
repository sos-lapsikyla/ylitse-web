import Text from '@/components/Text';
import LabeledInput from '@/components/LabeledInput';
import { DropdownMenu } from '@/components/Dropdown';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  isDisplayNameTooLong,
  isDisplayNameTooShort,
  isRegionTooLong,
  isStoryTooLong,
  validateBirthYear,
  validateEmail,
} from '@/features/ProfilePage/validators';
import ChipsEditor from '@/components/ChipsEditor';
import { Languages } from '@/components/constants';
import { useAppSelector } from '@/store';
import { selectAllSkillOptions } from '@/features/MentorPage/selectors';
import { ApiManagedUser, ManagedUser } from '../models';
import { ApiMentor } from '@/features/MentorPage/models';

type Props = {
  managedUser: ManagedUser;
  editableUserData: ApiManagedUser | undefined;
  setEditableUserData: React.Dispatch<
    React.SetStateAction<ApiManagedUser | undefined>
  >;
  editableMentorData: ApiMentor | undefined;
  setEditableMentorData: React.Dispatch<
    React.SetStateAction<ApiMentor | undefined>
  >;
};

const UserForm: React.FC<Props> = ({
  managedUser,
  editableMentorData,
  editableUserData,
  setEditableMentorData,
  setEditableUserData,
}) => {
  const { t } = useTranslation('users');
  const genderOptions = [
    { text: t('newUser.publicInfo.gender.options.female'), value: 'female' },
    { text: t('newUser.publicInfo.gender.options.male'), value: 'male' },
    { text: t('newUser.publicInfo.gender.options.other'), value: 'other' },
  ];
  const allLanguages = Languages.map(lang => lang.name);
  const allSkills = useAppSelector(selectAllSkillOptions());
  const isMentorAccount =
    managedUser?.role === 'mentor' && 'mentor' in managedUser;
  const shouldShowMentorFields = isMentorAccount;

  // validate form
  // Validation functions adapted for editable data
  const getEmailError = (): string | null => {
    const email = editableUserData?.user?.email?.trim();
    if (!email) return null;
    return validateEmail(email) ? null : t('editUser.accountInfo.invalidEmail');
  };

  const getDisplayNameError = (): string | null => {
    const name = editableUserData?.display_name?.trim();
    if (!name) return null;
    if (isDisplayNameTooLong(name))
      return t('editUser.publicInfo.displayName.tooLongError');
    if (isDisplayNameTooShort(name))
      return t('editUser.publicInfo.displayName.tooShortError');
    return null;
  };

  const getBirthYearError = (): string | null => {
    const year = editableMentorData?.birth_year;
    if (!year) return null;
    return validateBirthYear(Number(year))
      ? null
      : t('editUser.publicInfo.birthYear.invalidError');
  };

  const getRegionError = (): string | null => {
    const region = editableMentorData?.region?.trim();
    if (!region) return null;
    return isRegionTooLong(region)
      ? t('editUser.publicInfo.area.tooLongError')
      : null;
  };

  const getStoryError = (): string | null => {
    const story = editableMentorData?.story?.trim();
    if (!story) return null;
    return isStoryTooLong(story)
      ? t('editUser.publicInfo.story.tooLongError')
      : null;
  };

  return (
    <>
      <AccountInfo>
        <TextGroup>
          <TitleText variant="h2">{t('editUser.accountInfo.title')}</TitleText>
          <CaptionText variant="p">
            {t('editUser.accountInfo.caption')}
          </CaptionText>
        </TextGroup>

        <StaticField>
          <Text variant="bold"> {t('editUser.accountInfo.role.title')}</Text>
          <FieldText variant="p">{managedUser?.role}</FieldText>
        </StaticField>
        <StaticField>
          <Text variant="bold">
            {' '}
            {t('editUser.accountInfo.username.label')}
          </Text>
          <FieldText variant="p">{managedUser?.user?.loginName}</FieldText>
        </StaticField>

        <LabeledInput
          error={getEmailError()}
          label={t('editUser.accountInfo.email')}
          value={editableUserData?.user?.email ?? ''}
          onChange={value => {
            setEditableUserData(prev =>
              prev && prev.user
                ? { ...prev, user: { ...prev.user, email: value } }
                : prev,
            );
          }}
        />
      </AccountInfo>

      <PublicInfo>
        <TitleText variant="h2">{t('editUser.publicInfo.title')}</TitleText>
        <LabeledInput
          error={getDisplayNameError()}
          label={t('editUser.publicInfo.displayName.label')}
          value={editableUserData?.display_name ?? ''}
          onChange={value => {
            setEditableUserData(prev =>
              prev ? { ...prev, display_name: value } : prev,
            );
          }}
        />
        {shouldShowMentorFields && (
          <>
            <LabeledInput
              error={getBirthYearError()}
              label={t('editUser.publicInfo.birthYear.labelMentor')}
              value={String(editableMentorData?.birth_year ?? '')}
              onChange={value => {
                setEditableMentorData(prev =>
                  prev ? { ...prev, birth_year: Number(value) } : prev,
                );
              }}
            />
            <DropdownMenu
              options={genderOptions.map(o => o.text)}
              placeholder={t('editUser.publicInfo.gender.choose')}
              defaultOption={
                genderOptions.find(o => o.value === editableMentorData?.gender)
                  ?.text
              }
              selectOption={(selectedText: string) => {
                const selectedOption = genderOptions.find(
                  o => o.text === selectedText,
                );
                if (selectedOption) {
                  setEditableMentorData(prev =>
                    prev ? { ...prev, gender: selectedOption.value } : prev,
                  );
                }
              }}
              label={t('editUser.publicInfo.gender.labelMentor')}
            />

            <LabeledInput
              error={getRegionError()}
              label={t('editUser.publicInfo.area.label')}
              value={editableMentorData?.region ?? ''}
              onChange={value => {
                setEditableMentorData(prev =>
                  prev ? { ...prev, region: value } : prev,
                );
              }}
            />

            <LabeledInput
              error={getStoryError()}
              label={t('newUser.publicInfo.story.label')}
              variant="textarea"
              rows={6}
              value={editableMentorData?.story ?? ''}
              onChange={value => {
                setEditableMentorData(prev =>
                  prev ? { ...prev, story: value } : prev,
                );
              }}
            />
            <ChipsEditor
              updateChips={skills => {
                setEditableMentorData(prev =>
                  prev ? { ...prev, skills } : prev,
                );
              }}
              chips={editableMentorData?.skills ?? []}
              allOptions={allSkills}
              placeholder={t('editUser.publicInfo.newSkill')}
              label={t('editUser.publicInfo.skills')}
            ></ChipsEditor>
            <ChipsEditor
              updateChips={languages => {
                setEditableMentorData(prev =>
                  prev ? { ...prev, languages } : prev,
                );
              }}
              chips={editableMentorData?.languages ?? []}
              allOptions={allLanguages}
              placeholder={t('editUser.publicInfo.newLanguage')}
              label={t('editUser.publicInfo.languages')}
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
  margin: -1rem 0 0.5rem 0;
`;
const PublicInfo = styled.div`
  margin: -1rem 0 0 0;
`;
const StaticField = styled.div`
  margin: 1rem 0;
`;

const FieldText = styled(Text)`
  margin: 0.5rem 0 1rem 0;
`;
const TitleText = styled(Text)`
  margin: 1rem 0;
  padding: 1rem 0 1rem 0;
`;
const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export default UserForm;
