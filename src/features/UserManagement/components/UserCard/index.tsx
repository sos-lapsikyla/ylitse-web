import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import styled, { css } from 'styled-components';
import { palette } from '@/components/constants';

import type { ManagedUser } from '../../models';
import { Header } from './Header';
import { CardContent } from './CardContent';
import { MentorHeader } from './MentorHeader';

type Props = {
  managedUser: ManagedUser;
  onOpenEditModal: (user: ManagedUser) => void;
};

export const UserCard: React.FC<Props> = ({ managedUser, onOpenEditModal }) => {
  const { isMobile } = useGetLayoutMode();

  const isMentorAccount =
    managedUser.role === 'mentor' && 'mentor' in managedUser;
  const isVacationingMentor =
    isMentorAccount && (managedUser.mentor?.isVacationing ?? false);
  const isMentor =
    isMentorAccount && !(managedUser.mentor?.isVacationing ?? false);
  const isMentee = managedUser.role === 'mentee';
  const isAdmin = managedUser.role === 'admin';

  const mentorAge = isMentorAccount ? (managedUser.mentor?.age ?? 0) : 0;
  const mentorRegion = isMentorAccount
    ? (managedUser.mentor?.region ?? '')
    : '';
  const mentorMessage = isMentorAccount
    ? (managedUser.mentor?.statusMessage ?? '')
    : '';

  return (
    <Container $isMobile={isMobile}>
      {!isMentorAccount ? (
        <Header
          isAdmin={isAdmin}
          isMentor={isMentor}
          isMentee={isMentee}
          isVacationingMentor={isVacationingMentor}
          managedUser={managedUser}
          onOpenEditModal={onOpenEditModal}
        />
      ) : (
        <MentorHeader
          managedUser={managedUser}
          isAdmin={isAdmin}
          isMentor={isMentor}
          isMentee={isMentee}
          isVacationingMentor={isVacationingMentor}
          name={managedUser.nickname}
          age={mentorAge}
          region={mentorRegion}
          message={mentorMessage}
          onOpenEditModal={onOpenEditModal}
        ></MentorHeader>
      )}
      <CardContent managedUser={managedUser} />
    </Container>
  );
};

const Container = styled.div<{ $isMobile: boolean }>`
  background-color: ${palette.white};
  border-radius: 0.75rem;
  box-sizing: border-box;
  display: flex;
  filter: drop-shadow(-0.5rem 0 0.5rem rgba(0, 0, 0, 0.02))
    drop-shadow(0.5rem 0 0.5rem rgba(0, 0, 0, 0.02))
    drop-shadow(0 0.5rem 0.5rem rgba(0, 0, 0, 0.02));
  flex-direction: column;
  max-width: 440px;
  overflow: visible;
  padding-bottom: 4rem;
  width: 100%;

  ${({ $isMobile }) =>
    $isMobile &&
    css`
      margin: 0 auto;
      max-width: 350px;
      width: 100%;
    `}
`;

export default UserCard;
