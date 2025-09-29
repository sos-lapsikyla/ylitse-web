import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import styled, { css } from 'styled-components';
import type { ManagedUser } from '../../models';

import UserCard from '../UserCard';

type Props = {
  managedUsers: Array<ManagedUser>;
  setVisibleCard: (managedUser: ManagedUser) => void;
};

const UserCardList: React.FC<Props> = ({ setVisibleCard, managedUsers }) => {
  const { isMobile } = useGetLayoutMode();

  return (
    <UserCardsList $isMobile={isMobile} data-testid="user-cards-container">
      {managedUsers.map(managedUser => (
        <UserCard
          key={managedUser.id}
          managedUser={managedUser}
          setVisibleCard={setVisibleCard}
        />
      ))}
    </UserCardsList>
  );
};

const UserCardsList = styled.div<{ $isMobile: boolean }>`
  display: grid;
  margin-top: 3rem;
  width: 100%;

  ${({ $isMobile }) =>
    $isMobile
      ? css`
          gap: 1.5rem;
          grid-auto-columns: minmax(300px, 90%);
          grid-auto-columns: 80%;
          grid-auto-flow: column;
          overflow-x: auto;
          scroll-snap-type: x mandatory;

          &::-webkit-scrollbar {
            display: none;
          }
        `
      : css`
          gap: clamp(4rem, 2vw, 1.5rem);
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        `}
`;

export default UserCardList;
