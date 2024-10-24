import styled, { css } from 'styled-components';
import { useBlocker } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { selectMentor, selectUser } from '@/features/Authentication/userSlice';
import { useAppSelector } from '@/store';
import { useConfirm } from '@/features/Confirmation/useConfirm';
import { useUpdateMentorMutation } from '@/features/MentorPage/mentorPageApi';
import { useUpdateUserMutation } from '@/features/Authentication/authenticationApi';

import { ButtonRow } from '..';
import Columns from './Columns';
import {
  isDisplayNameTooLong,
  isDisplayNameTooShort,
  isRegionTooLong,
  isStatusMessageTooLong,
  isStoryTooLong,
  validateBirthYear,
} from '@/features/ProfilePage/validators';
import LabeledInput from '@/components/LabeledInput';
import { palette } from '@/components/constants';
import SkillsEditor from '../SkillsEditor';
import Text from '@/components/Text';
import { TextButton } from '@/components/Buttons';

import type { ApiMentor } from '@/features/MentorPage/mentorPageApi';

type Props = {
  isMobile?: boolean;
};

const PublicInfo = ({ isMobile = false }: Props) => {
  const { t } = useTranslation('profile');
  const { getConfirmation } = useConfirm();
  const user = useAppSelector(selectUser);
  const mentor = useAppSelector(selectMentor);
  const [updateMentor, { isLoading: isLoadingMentor }] =
    useUpdateMentorMutation();
  const [updateUser, { isLoading: isLoadingUser }] = useUpdateUserMutation();

  const [localData, setLocalData] = useState<ApiMentor>(mentor);
  const [isDirty, setIsDirty] = useState(false);

  const updateMentorData = <K extends keyof ApiMentor>(
    key: K,
    value: ApiMentor[K],
  ) => {
    setLocalData({ ...localData, [key]: value });
    setIsDirty(true);
  };

  const discardChanges = () => {
    setLocalData(mentor);
    setIsDirty(false);
  };

  const saveMentorData = async () => {
    try {
      // Only update user if display_name has changed
      if (localData.display_name !== mentor.display_name) {
        await updateUser({
          ...user,
          display_name: localData.display_name,
        }).unwrap();
      }
      await updateMentor(localData).unwrap();
      setIsDirty(false);
    } catch (err) {
      return;
    }
  };

  // Block navigating elsewhere in the app if there are unsaved changes
  const blocker = useBlocker(() => isDirty);

  useEffect(() => {
    const confirmLeave = async () => {
      const isConfirmed = await getConfirmation({
        borderColor: palette.redSalmon,
        closeText: t('public.mentor.leavePage.cancel'),
        confirmId: 'confirm-leave',
        confirmText: t('public.mentor.leavePage.confirm'),
        description: t('public.mentor.leavePage.description'),
        title: t('public.mentor.leavePage.title'),
      });
      if (isConfirmed) {
        if (blocker.state === 'blocked') blocker.proceed();
      } else {
        if (blocker.state === 'blocked') blocker.reset();
      }
    };

    if (blocker.state === 'blocked') confirmLeave();
  }, [blocker.state]);

  const isLoading = isLoadingMentor || isLoadingUser;
  const isDiscardingDisabled = !isDirty || isLoading;

  const getBirthYearError = (): string | null =>
    validateBirthYear(localData.birth_year)
      ? null
      : t('public.mentor.birthYear.invalidError');

  const getDisplayNameError = (): string | null => {
    if (isDisplayNameTooLong(localData.display_name))
      return t('public.mentor.displayName.tooLongError');

    if (isDisplayNameTooShort(localData.display_name))
      return t('public.mentor.displayName.tooShortError');

    return null;
  };

  const getRegionError = (): string | null =>
    isRegionTooLong(localData.region)
      ? t('public.mentor.region.tooLongError')
      : null;

  const getStatusMessageError = (): string | null =>
    isStatusMessageTooLong(localData.status_message)
      ? t('public.mentor.statusMessage.tooLongError')
      : null;

  const getStoryError = (): string | null =>
    isStoryTooLong(localData.story)
      ? t('public.mentor.story.tooLongError')
      : null;

  const isSavingDisabled =
    Boolean(getBirthYearError()) ||
    Boolean(getDisplayNameError()) ||
    Boolean(getRegionError()) ||
    Boolean(getStatusMessageError()) ||
    Boolean(getStoryError()) ||
    !isDirty ||
    isLoading;

  return (
    <Container isMobile={isMobile}>
      <Header isMobile={isMobile} variant="h2">
        {t('public.title')}
      </Header>
      <Buttons>
        <TextButton
          isDisabled={isDiscardingDisabled}
          onClick={discardChanges}
          variant={isDiscardingDisabled ? 'disabledOutline' : 'outlinePurple'}
        >
          {t('public.mentor.discardChanges')}
        </TextButton>
        <TextButton
          isDisabled={isSavingDisabled}
          onClick={saveMentorData}
          variant={isSavingDisabled ? 'disabled' : 'dark'}
        >
          {t('public.mentor.save')}
        </TextButton>
      </Buttons>
      <Form>
        <Text>{t('public.mentor.mandatoryNotice')}</Text>
        <Columns
          birthYearError={getBirthYearError()}
          displayNameError={getDisplayNameError()}
          isMobile={isMobile}
          mentor={localData}
          regionError={getRegionError()}
          statusMessageError={getStatusMessageError()}
          updateMentor={updateMentorData}
        />
        <LabeledInput
          error={getStoryError()}
          label={t('public.mentor.story.label')}
          onChange={value => updateMentorData('story', value)}
          rows={4}
          value={localData.story}
          variant="textarea"
        />
        <SkillsEditor
          updateSkills={skills => updateMentorData('skills', skills)}
          skills={localData.skills}
        />
      </Form>
    </Container>
  );
};

const Container = styled.div<{ isMobile: boolean }>`
  ${({ isMobile }) =>
    isMobile
      ? css`
          box-sizing: border-box;
          display: flex;
          flex: 2;
          flex-direction: column;
        `
      : css`
          background-color: ${palette.white};
          border-radius: 10px;
          box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
          box-sizing: border-box;
          display: flex;
          flex: 2;
          flex-direction: column;
          padding: 2rem 0 4rem;
        `}
`;

const Header = styled(Text)<{ isMobile: boolean }>`
  align-self: ${({ isMobile }) => (isMobile ? 'flex-start' : 'center')};
  padding: 0 3rem;
`;

const Buttons = styled(ButtonRow)`
  background-color: ${palette.blue3};
  margin-top: 1rem;
  padding: 1.5rem;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 3rem;
`;

export default PublicInfo;
