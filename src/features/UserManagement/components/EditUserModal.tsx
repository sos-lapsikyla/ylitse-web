// import toast from 'react-hot-toast';
import React, { useEffect, useState } from 'react';

import { useEscape } from '@/hooks/useEscape';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { TextButton } from '@/components/Buttons';
import { Modal, ModalBackground } from '@/components/Modal';
import { ApiManagedUser, ManagedUser } from '../models';
import EditUserForm from './EditUserForm';
import { ApiMentor } from '@/features/MentorPage/models';
import {
  useUpdateAccountMutation,
  useUpdateUserMutation,
} from '@/features/ProfilePage/profileApi';
import { useUpdateMentorMutation } from '@/features/MentorPage/mentorPageApi';
import toast from 'react-hot-toast';

type Props = {
  managedUser: ManagedUser;
  onDismiss: () => void;
};

const EditUserModal: React.FC<Props> = ({ onDismiss, managedUser }) => {
  const { t } = useTranslation('users');
  useEscape(() => onDismiss());

  const [editableUserData, setEditableUserData] = useState<
    ApiManagedUser | undefined
  >(undefined);
  const [editableMentorData, setEditableMentorData] = useState<
    ApiMentor | undefined
  >(undefined);
  const isMentorAccount =
    managedUser?.role === 'mentor' && 'mentor' in managedUser;

  useEffect(() => {
    if (!isMentorAccount) return;
    const editableMentor: ApiMentor = {
      account_id: managedUser.account_id,
      active: true,
      birth_year: new Date().getFullYear() - managedUser.mentor.age,
      communication_channels: managedUser.mentor.communicationChannels,
      created: managedUser.mentor.created,
      display_name: managedUser.nickname,
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
  }, [managedUser]);

  const [updateAccount] = useUpdateAccountMutation();
  const [updateUser] = useUpdateUserMutation();
  const [updateMentor] = useUpdateMentorMutation();

  const handleSubmit = async () => {
    if (!editableUserData) return;
    try {
      if (editableUserData.user?.email) {
        await updateAccount({
          ...editableUserData.user,
          email: editableUserData.user.email,
        }).unwrap();
      }
      await updateUser({
        id: managedUser.id,
        account_id: managedUser.account_id,
        display_name: editableUserData?.display_name,
        role: managedUser.role,
        active: true,
      }).unwrap();
      toast.success(t('notification.success.edit'), {
        id: 'update-success',
      });
      if (editableMentorData && isMentorAccount) {
        const mentorPayload: ApiMentor = {
          display_name: editableUserData.display_name,
          active: true,
          birth_year: Number(editableMentorData.birth_year),
          gender: editableMentorData.gender,
          region: editableMentorData.region,
          story: editableMentorData.story,
          skills: editableMentorData.skills,
          languages: editableMentorData.languages,
          account_id: editableMentorData.account_id,
          communication_channels: editableMentorData.communication_channels,
          created: editableMentorData.created,
          id: editableMentorData.id,
          is_vacationing: editableMentorData.is_vacationing,
          status_message: editableMentorData.status_message,
          user_id: editableMentorData.user_id,
        };
        await updateMentor(mentorPayload).unwrap();
        toast.success(t('notification.success.mentorEdit'), {
          id: 'update-success',
        });
      }
      onDismiss();
    } catch (error) {
      console.log(error);
      toast.success(t('notification.failure.edit'), {
        id: 'update-failure',
      });
      toast.success(t('notification.success.mentorEdit'), {
        id: 'update-failure',
      });
    }
  };

  return (
    <ModalBackground>
      <Modal title={t('editUser.title')} onDismiss={onDismiss}>
        <EditUserForm
          managedUser={managedUser}
          editableUserData={editableUserData}
          setEditableUserData={setEditableUserData}
          editableMentorData={editableMentorData}
          setEditableMentorData={setEditableMentorData}
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
  padding: 2rem 0 1.75rem 0;
`;

export default EditUserModal;
