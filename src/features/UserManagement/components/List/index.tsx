import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import styled, { css } from 'styled-components';
import type { ManagedUser } from '../../models';

import UserCard from '../UserCard';
import { useState } from 'react';
import EditUserModal from '../EditUserModal';

type Props = {
  managedUsers: Array<ManagedUser>;
};

const UserCardList: React.FC<Props> = ({ managedUsers }) => {
  const { isMobile } = useGetLayoutMode();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedManagedUser, setSelectedManagedUser] =
    useState<ManagedUser | null>(null);
  console.log(selectedManagedUser);

  // Function passed down through props
  const openEditModal = (managedUser: ManagedUser) => {
    setSelectedManagedUser(managedUser);
    setIsEditModalOpen(true);
  };
  const closeModal = () => setIsEditModalOpen(false);

  return (
    <UserCardsList $isMobile={isMobile} data-testid="user-cards-container">
      {managedUsers.map(managedUser => (
        <UserCard
          key={managedUser.id}
          managedUser={managedUser}
          onOpenEditModal={openEditModal}
        />
      ))}
      {isEditModalOpen && (
        <EditUserModal onDismiss={closeModal}></EditUserModal>
      )}
    </UserCardsList>
  );
};
const UserCardsList = styled.div<{ $isMobile: boolean }>`
  display: grid;
  gap: clamp(4rem, 2vw, 1.5rem);
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  justify-items: center;
  margin-top: 3rem;
  width: 100%;

  ${({ $isMobile }) =>
    $isMobile &&
    css`
      align-items: center;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      max-width: 100%;
      padding: 0 1rem;
      width: 100%;
    `}
`;

export default UserCardList;
