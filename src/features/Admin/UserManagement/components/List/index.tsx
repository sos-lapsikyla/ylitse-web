import type { ManagedUser } from '../../models';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import styled, { css } from 'styled-components';
import { CONTENT_WIDTH, spacing } from '@/components/constants';
import UserCard from '../UserCard';

type Props = {
  managedUsers: Array<ManagedUser>;
  setVisibleCard: (managedUser: ManagedUser) => void;
};

const UserCardList: React.FC<Props> = ({ setVisibleCard, managedUsers }) => {
  const { isMobile } = useGetLayoutMode();

  return (
    <UserCardsList isMobile={isMobile} data-testid="user-cards-container">
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

const UserCardsList = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex: 1;
  ${({ isMobile }) =>
    isMobile
      ? css`
          gap: 1.5rem;
          overflow: auto;
          padding-top: 1.5rem;
          scroll-snap-type: x mandatory;
          white-space: nowrap;
          &::-webkit-scrollbar {
            display: none;
          }
        `
      : css`
          flex-wrap: wrap;
          height: auto;
          justify-content: stretch;
          margin-left: calc(${spacing.layout_spacing} * -1);
          margin-top: ${spacing.layout_spacing};
          width: calc(${CONTENT_WIDTH} + (${spacing.layout_spacing} * 2));
        `}

  @media screen and (max-width: 1500px) {
    width: calc(1130px + (${spacing.layout_spacing} * 2));
    max-width: 100vw;
  }
`;

export default UserCardList;
