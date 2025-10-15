import { Modal, ModalBackground } from '@/components/Modal';
import { TextButton } from '@/components/Buttons';
import { useEscape } from '@/hooks/useEscape';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import React from 'react';

import {
  useAddManagedAccountMutation,
  useAddManagedUserMutation,
  useAddMentorMutation,
} from '../userManagementApi';
import UserForm from './UserForm';
import { useUserForm } from './useUserForm';
import styled from 'styled-components';

type Props = {
  onDismiss: () => void;
};

const NewUserModal: React.FC<Props> = ({ onDismiss }) => {
  const { t } = useTranslation('users');
  useEscape(() => onDismiss());

  const { formData, updateField, reset } = useUserForm();

  const [addAccount] = useAddManagedAccountMutation();
  const [addUser] = useAddManagedUserMutation();
  const [addMentor] = useAddMentorMutation();

  const handleSubmit = async () => {
    if (!formData.username || !formData.password || !formData.role) {
      toast.error('Täytä kaikki pakolliset kentät');
      return;
    }
    if (formData.password !== formData.passwordAgain) {
      toast.error('Salasanat eivät täsmää');
      return;
    }

    try {
      // Create account
      const accountPayload = {
        account: {
          login_name: formData.username,
          role: formData.role,
          email: formData.email || undefined,
        },
        password: formData.password,
      };

      const accountResponse = await addAccount(accountPayload).unwrap();
      const accountId = accountResponse.account.id;
      const userId = accountResponse.user.id;
      // Create user profile
      const userPayload = {
        id: userId,
        account_id: accountId,
        display_name: formData.displayName,
        role: formData.role,
      };
      await addUser(userPayload).unwrap();

      const mentorId = accountResponse.mentor?.id;
      // add mentor data
      if (userPayload.role === 'mentor' && mentorId) {
        const mentorPayload = {
          id: mentorId,
          account_id: accountId,
          user_id: userId,
          display_name: accountResponse.user.display_name,
          birth_year: Number(formData.birthYear),
          region: formData.area || '',
          story: formData.story || '',
          skills: formData.skills.length ? formData.skills : [],
          languages: [],
          communication_channels: [],
          gender: 'male',
        };
        await addMentor(mentorPayload).unwrap();
      }

      reset();
      onDismiss();
    } catch (err) {
      console.error(err);
      toast.error(t('notification.failure.userCreate'));
    }
  };

  return (
    <ModalBackground>
      <Modal title={t('newUser.title')} onDismiss={onDismiss}>
        <UserForm formData={formData} updateField={updateField} />
        <ButtonContainer>
          <TextButton size="normal" onClick={onDismiss} variant="light">
            {t('newUser.cancel')}
          </TextButton>
          <TextButton
            size="normal"
            onClick={() => void handleSubmit()}
            variant="dark"
          >
            {t('newUser.createNewUser')}
          </TextButton>
        </ButtonContainer>
      </Modal>
    </ModalBackground>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default NewUserModal;
