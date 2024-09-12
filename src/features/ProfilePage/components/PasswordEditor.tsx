import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ButtonRow, Section, Value } from '.';
import { Column, SpacedRow } from '@/components/common';
import { DEFAULT_ICON_SIZE, PASSWORD_MIN_LENGTH } from '@/components/constants';
import { IconButton, TextButton } from '@/components/Buttons';
import PasswordInput from '@/components/PasswordInput';
import Text from '@/components/Text';

const PasswordEditor = () => {
  const { t } = useTranslation('profile');
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

  const [isCurrentPasswordInvalid, setIsCurrentPasswordInvalid] =
    useState(false);

  const isPasswordTooShort =
    isNewPasswordTouched && newPassword.length < PASSWORD_MIN_LENGTH;

  const arePasswordsNotMatching =
    isNewPasswordTouched &&
    isRepeatedPasswordTouched &&
    newPassword !== repeatedPassword;

  const isSavingDisabled =
    !currentPassword.length || isPasswordTooShort || arePasswordsNotMatching;

  const saveNewPassword = () => {
    console.log('API: Save new password');
    setIsCurrentPasswordInvalid(true);
  };

  return isOpen ? (
    <Section>
      <PasswordInput
        error={
          isCurrentPasswordInvalid ? t('account.password.error.invalid') : null
        }
        label={t('account.password.current')}
        onChange={setCurrentPassword}
        value={currentPassword}
      />
      <PasswordInput
        error={isPasswordTooShort ? t('account.password.error.tooShort') : null}
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
          onClick={saveNewPassword}
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
          variant="edit"
          sizeInPx={DEFAULT_ICON_SIZE.LARGE}
          onClick={toggleIsOpen}
        />
      </SpacedRow>
    </Section>
  );
};

export default PasswordEditor;