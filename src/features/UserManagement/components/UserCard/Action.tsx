import styled from 'styled-components';
import Text from '@/components/Text';
import { palette } from '@/components/constants';
import { Chevron } from '@/components/Icons/Chevron';
import { useState } from 'react';
import { Button } from '@/components/Buttons';
import { useAppDispatch, useAppSelector } from '@/store';
import { useNavigate } from 'react-router';
import { setConversation } from '@/features/Chat/chatSlice';
import { ManagedUser } from '../../models';
import { useTranslation } from 'react-i18next';
import { useDeleteManagedUserMutation } from '../../userManagementApi';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import { selectAccount } from '@/features/Authentication/selectors';

type Props = {
  managedUser: ManagedUser;
  onOpenEditModal: (user: ManagedUser) => void;
};

export const Action = ({ managedUser, onOpenEditModal }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('users');

  return (
    <Container>
      <ActionButton onClick={() => setIsOpen(!isOpen)}>
        <Text variant="bold" color="purple">
          {t('action.title')}{' '}
        </Text>
        <Chevron variant={isOpen ? 'up' : 'down'} color={'purple'} isLarge />
      </ActionButton>
      {isOpen && (
        <ActionMenu
          managedUser={managedUser}
          onOpenEditModal={onOpenEditModal}
        />
      )}
    </Container>
  );
};

const ActionMenu = ({ managedUser, onOpenEditModal }: Props) => {
  const { t } = useTranslation('users');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const name = managedUser.nickname;
  const buddyId = managedUser.id;
  const [deleteManagedUser] = useDeleteManagedUserMutation();
  const confirmDelete = useConfirmDelete();
  const { id: currentUserId } = useAppSelector(selectAccount);
  const id = managedUser.account_id;
  const isMe = currentUserId === managedUser.account_id;

  const handleConversationStart = () => {
    dispatch(setConversation({ name, buddyId }));
    navigate('/chat');
  };

  return (
    <Menu>
      <Button
        onClick={handleConversationStart}
        sizeInPx={46}
        leftIcon="chatWithBackground"
        text={{
          variant: 'bold',
          color: 'purple',
          text: t('action.conversation'),
        }}
      />
      <Button
        onClick={() => onOpenEditModal(managedUser)}
        sizeInPx={46}
        leftIcon="edit"
        text={{
          variant: 'bold',
          color: 'purple',
          text: t('action.edit'),
        }}
      />
      {!isMe && (
        <Button
          onClick={() => {
            void confirmDelete({
              id,
              onDelete: deleteManagedUser,
              title: t('delete.title'),
              description: t('delete.description'),
              confirmId: 'confirm-delete',
              borderColor: palette.redSalmon,
              closeText: t('delete.cancel'),
              confirmText: t('delete.confirm'),
            });
          }}
          sizeInPx={46}
          leftIcon="deleteWithBackground"
          text={{
            variant: 'bold',
            color: 'purple',
            text: t('action.delete'),
          }}
        />
      )}
    </Menu>
  );
};

const ActionButton = styled.button`
  align-items: center;
  background-color: white;
  border: 2px solid ${palette.purple};
  border-radius: 50px;
  cursor: pointer;
  display: inline-flex;
  gap: 0.5rem;
  height: 2rem;
  justify-content: space-between;
  padding: 0 0.7rem;
  width: fit-content;

  &:focus {
    outline: none;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: visible;
  position: relative;
  z-index: 100;
`;

const Menu = styled.div`
  background-color: white;
  border: 1px solid ${palette.purple};
  border-radius: 10px;
  display: flex;
  filter: drop-shadow(-0.5rem 0 0.5rem rgba(0, 0, 0, 0.02))
    drop-shadow(0.5rem 0 0.5rem rgba(0, 0, 0, 0.02))
    drop-shadow(0 0.5rem 0.5rem rgba(0, 0, 0, 0.02));
  flex-direction: column;
  gap: 12px;
  left: 0;
  overflow: visible;
  padding: 20px 16px;
  position: absolute;
  top: 100%;
  z-index: 100;
`;
