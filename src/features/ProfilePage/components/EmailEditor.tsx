import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { selectAccount } from '@/features/Authentication/userSlice';
import { useAppSelector } from '@/store';
import { useUpdateAccountMutation } from '@/features/Authentication/authenticationApi';

import { ButtonRow, Section, Value } from '.';
import { Column, SpacedRow } from '@/components/common';
import { DEFAULT_ICON_SIZE } from '@/components/constants';
import { IconButton, TextButton } from '@/components/Buttons';
import LabeledInput from '@/components/LabeledInput';
import Text from '@/components/Text';
import { validateEmail } from '../validators';

const EmailEditor = () => {
  const { t } = useTranslation('profile');
  const account = useAppSelector(selectAccount);
  const [updateAccount, { isLoading }] = useUpdateAccountMutation();

  const [email, setEmail] = useState(account.email);
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => setIsOpen(!isOpen);

  const hasNotChanged = account.email === email;
  const isEmailInvalid = !validateEmail(email);
  const isEmailMissing = !email.length;
  const isSavingDisabled =
    hasNotChanged || isEmailInvalid || isEmailMissing || isLoading;

  const emailValue = isEmailMissing ? t('account.email.missing') : email;

  const saveEmail = async () => {
    try {
      await updateAccount({ ...account, email }).unwrap();
      setIsOpen(false);
    } catch (err) {
      return;
    }
  };

  return isOpen ? (
    <Section>
      <LabeledInput
        error={isEmailInvalid ? t('account.email.invalid') : null}
        label={t('account.email.label')}
        onChange={setEmail}
        value={email}
      />
      <ButtonRow>
        <TextButton onClick={toggleIsOpen} variant="light">
          {t('account.cancel')}
        </TextButton>
        <TextButton
          isDisabled={isSavingDisabled}
          onClick={saveEmail}
          variant={isSavingDisabled ? 'disabled' : 'dark'}
        >
          {t('account.save')}
        </TextButton>
      </ButtonRow>
      <Text variant="blueBox">{t('account.email.info')}</Text>
    </Section>
  ) : (
    <Section>
      <SpacedRow>
        <Column>
          <Text variant="label">{t('account.email.label')}</Text>
          <Value>{emailValue}</Value>
        </Column>
        <IconButton
          id="open-email-editor"
          onClick={toggleIsOpen}
          sizeInPx={DEFAULT_ICON_SIZE.HUGE}
          variant="edit"
        />
      </SpacedRow>
      <Text variant="blueBox">{t('account.email.info')}</Text>
    </Section>
  );
};

export default EmailEditor;
