import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { selectAccountId } from '@/features/Authentication/userSlice';
import { useAppSelector } from '@/store';
import { useChangePasswordMutation } from '@/features/Authentication/authenticationApi';

import { ButtonRow, Section, Value } from '.';
import { Column, SpacedRow } from '@/components/common';
import { DEFAULT_ICON_SIZE } from '@/components/constants';
import { IconButton, TextButton } from '@/components/Buttons';
import { isPasswordTooShort } from '../validators';
import PasswordInput from '@/components/PasswordInput';
import Text from '@/components/Text';

const PasswordEditor = () => {
  const { t } = useTranslation('profile');
  const accountId = useAppSelector(selectAccountId);
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const [isOpen, setIsOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');

  const [isNewPasswordTouched, setIsNewPasswordTouched] = useState(false);
  const [isRepeatedPasswordTouched, setIsRepeatedPasswordTouched] =
    useState(false);

  const toggleIsOpen = () => setIsOpen(!isOpen);
  const touchNewPassword = () => setIsNewPasswordTouched(true);
  const touchRepeatedPassword = () => setIsRepeatedPasswordTouched(true);

  const arePasswordsNotMatching =
    isNewPasswordTouched &&
    isRepeatedPasswordTouched &&
    newPassword !== repeatedPassword;

  const isSavingDisabled =
    isLoading ||
    !currentPassword.length ||
    isPasswordTooShort(newPassword, isNewPasswordTouched) ||
    arePasswordsNotMatching;

  const getPasswordError = () =>
    isPasswordTooShort(newPassword, isNewPasswordTouched)
      ? t('account.password.error.tooShort')
      : null;

  const savePassword = async () => {
    try {
      await changePassword({
        accountId,
        currentPassword,
        newPassword,
      }).unwrap();
      setIsOpen(false);
    } catch (err) {
      return;
    }
  };

  return isOpen ? (
    <Section>
      <PasswordInput
        label={t('account.password.current')}
        onChange={setCurrentPassword}
        value={currentPassword}
      />
      <PasswordInput
        error={getPasswordError()}
        label={t('account.password.new')}
        onBlur={touchNewPassword}
        onChange={setNewPassword}
        tooltip={t('account.password.tooltip')}
        value={newPassword}
      />
      <PasswordInput
        error={
          arePasswordsNotMatching ? t('account.password.error.dontMatch') : null
        }
        label={t('account.password.repeat')}
        onBlur={touchRepeatedPassword}
        onChange={setRepeatedPassword}
        tooltip={t('account.password.tooltip')}
        value={repeatedPassword}
      />
      <ButtonRow>
        <TextButton onClick={toggleIsOpen} variant="light">
          {t('account.cancel')}
        </TextButton>
        <TextButton
          isDisabled={isSavingDisabled}
          onClick={savePassword}
          variant={isSavingDisabled ? 'disabled' : 'dark'}
        >
          {t('account.save')}
        </TextButton>
      </ButtonRow>
    </Section>
  ) : (
    <Section>
      <SpacedRow>
        <Column>
          <Text variant="label">{t('account.password.label')}</Text>
          <Value>{t('account.password.placeholder')}</Value>
        </Column>
        <IconButton
          id="open-password-editor"
          onClick={toggleIsOpen}
          sizeInPx={DEFAULT_ICON_SIZE.HUGE}
          variant="edit"
        />
      </SpacedRow>
    </Section>
  );
};

export default PasswordEditor;
