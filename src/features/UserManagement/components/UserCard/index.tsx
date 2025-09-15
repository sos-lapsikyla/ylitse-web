import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import styled, { css } from 'styled-components';
import { palette } from '@/components/constants';
import { Header } from './Header';
import { ManagedUser } from '../../models';
import CardContent from './CardContent';

type Props = {
  setVisibleCard: (managedUser: ManagedUser) => void;
  managedUser: ManagedUser;
};

export const UserCard: React.FC<Props> = ({ setVisibleCard, managedUser }) => {
  const { isMobile } = useGetLayoutMode();

  const isVacationingMentor =
    managedUser.role === 'mentor' && managedUser.isVacationing === true;
  const isMentor = managedUser.role === 'mentor' && !managedUser.isVacationing;
  const isMentee = managedUser.role === 'mentee';
  const isAdmin = managedUser.role === 'admin';

  console.log(setVisibleCard);
  console.log(
    managedUser.role,
    managedUser.nickname,
    managedUser.isVacationing,
    managedUser.birthYear,
  );
  return (
    <Container isMobile={isMobile}>
      <Header
        isAdmin={isAdmin}
        isMentor={isMentor}
        isMentee={isMentee}
        isVacationingMentor={isVacationingMentor}
        name={managedUser.nickname}
      />
      <CardContent managedUser={managedUser} />
    </Container>
  );
};

const Container = styled.div<{ isMobile: boolean }>`
  background-color: ${palette.white};
  border-radius: 0.75rem;
  display: flex;
  filter: drop-shadow(-0.5rem 0 0.5rem rgba(0, 0, 0, 0.02))
    drop-shadow(0.5rem 0 0.5rem rgba(0, 0, 0, 0.02))
    drop-shadow(0 0.5rem 0.5rem rgba(0, 0, 0, 0.02));
  flex-direction: column;

  ${({ isMobile }) =>
    isMobile &&
    css`
      margin: 1rem 0;
      scroll-behavior: smooth;
      scroll-snap-align: center;

      &:first-child {
        margin-left: 1.5rem;
      }
      &:last-child {
        margin-right: 1.5rem;
      }
    `}
`;

export default UserCard;
