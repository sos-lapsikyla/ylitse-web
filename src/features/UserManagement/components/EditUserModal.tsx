// import toast from 'react-hot-toast';
import React from 'react';

import { useEscape } from '@/hooks/useEscape';
import { useTranslation } from 'react-i18next';
// import {
//   useAddManagedAccountMutation,
//   useAddManagedUserMutation,
//   useAddMentorMutation,
// } from '../userManagementApi';
import { useUserForm } from './useUserForm';

import styled from 'styled-components';
import { TextButton } from '@/components/Buttons';
import { Modal, ModalBackground } from '@/components/Modal';
import { ManagedUser } from '../models';
import EditUserForm from './EditUserForm';
// import {
//   useUpdateAccountMutation,
//   useUpdateUserMutation,
// } from '@/features/ProfilePage/profileApi';
// import { useUpdateMentorMutation } from '@/features/MentorPage/mentorPageApi';

type Props = {
  managedUser: ManagedUser;
  onDismiss: () => void;
};

const EditUserModal: React.FC<Props> = ({ onDismiss, managedUser }) => {
  const { t } = useTranslation('users');
  useEscape(() => onDismiss());

  const { formData, updateField } = useUserForm();

  //   const [updateAccount] = useUpdateAccountMutation();
  //   const [updateUser] = useUpdateUserMutation();
  //   const [updateMentor] = useUpdateMentorMutation();

  const handleSubmit = async () => {};

  return (
    <ModalBackground>
      <Modal title={t('editUser.title')} onDismiss={onDismiss}>
        <EditUserForm
          formData={formData}
          updateField={updateField}
          managedUser={managedUser}
        />
        <ButtonContainer>
          <TextButton size="normal" onClick={onDismiss} variant="light">
            {t('editUser.cancel')}
          </TextButton>
          <TextButton
            size="normal"
            onClick={() => void handleSubmit()}
            variant={'dark'}
          >
            {t('editUser.save')}
          </TextButton>
        </ButtonContainer>
      </Modal>
    </ModalBackground>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: space-between;
  padding-bottom: 1.75rem;
`;

export default EditUserModal;
