import Text from '@/components/Text';
import LabeledInput from '@/components/LabeledInput';
import { DropdownMenu } from '@/components/Dropdown';
import styled from 'styled-components';
import { UserFormData } from './useUserForm';
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
import { useEffect, useState } from 'react';
import { ApiMentor } from '@/features/MentorPage/models';

type Props = {
  formData: UserFormData;
  updateField: <K extends keyof UserFormData>(
    key: K,
    value: UserFormData[K],
  ) => void;
  managedUser: ManagedUser;
};

const UserForm: React.FC<Props> = ({ formData, updateField, managedUser }) => {
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
  const shouldShowMentorFields = formData.role === 'mentor' || isMentorAccount;

  const [editableUserData, setEditableUserData] = useState<
    ApiManagedUser | undefined
  >(undefined);
  const [editableMentorData, setEditableMentorData] = useState<
    ApiMentor | undefined
  >(undefined);

  useEffect(() => {
    if (!isMentorAccount) return;
    const editableMentor: ApiMentor = {
      account_id: managedUser.account_id,
      active: true,
      birth_year: new Date().getFullYear() - managedUser.mentor.age,
      communication_channels: managedUser.mentor.communicationChannels,
      created: new Date(managedUser.created).toISOString(),
      display_name: '',
      gender: managedUser.mentor.gender,
      id: managedUser.mentor.mentorId,
      is_vacationing: managedUser.mentor.isVacationing,
      languages: managedUser.mentor.languages,
      region: managedUser.mentor.region,
      skills: managedUser.mentor.skills,
      status_message: managedUser.mentor.statusMessage,
      story: managedUser.mentor.story,
      user_id: managedUser.mentor.buddyId,
    };
    setEditableMentorData(editableMentor);
    console.log(editableMentor);
  }, [managedUser]);

  useEffect(() => {
    const editable: ApiManagedUser = {
      id: managedUser.id,
      display_name: managedUser.nickname,
      role: managedUser.role,
      account_id: managedUser.account_id,
      active: true,
      created: new Date(managedUser.created).toISOString(),
      updated: new Date().toISOString(),
      user: managedUser.user
        ? {
            id: managedUser.user.id,
            login_name: managedUser.user.loginName,
            email: managedUser.user.email,
            active: true,
            role: managedUser.role,
          }
        : undefined,
    };
    setEditableUserData(editable);
    console.log(editable);
  }, [managedUser]);

  // validate form
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
          onChange={value => updateField('email', value)}
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
        <LabeledInput
          error={getBirthYearError()}
          label={
            formData.role === 'mentor'
              ? t('editUser.publicInfo.birthYear.labelMentor')
              : t('editUser.publicInfo.birthYear.label')
          }
          value={String(editableMentorData?.birth_year ?? '')}
          onChange={value => {
            setEditableMentorData(prev =>
              prev ? { ...prev, birth_year: Number(value) } : prev,
            );
          }}
        />
        {shouldShowMentorFields && (
          <>
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
  margin: -1rem 0 1rem 0;
`;
const PublicInfo = styled.div`
  padding: 0 0 6rem 0;
`;
const StaticField = styled.div`
  margin: 2rem 0;
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
