import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import styled, { css } from 'styled-components';
import { palette } from '@/components/constants';

import type { ManagedUser } from '../../models';
import { Header } from './Header';
import { CardContent } from './CardContent';
import { MentorHeader } from './MentorHeader';

type Props = {
  setVisibleCard: (managedUser: ManagedUser) => void;
  managedUser: ManagedUser;
};

export const UserCard: React.FC<Props> = ({ setVisibleCard, managedUser }) => {
  const { isMobile } = useGetLayoutMode();

  const isMentorAccount =
    managedUser.role === 'mentor' && 'mentor' in managedUser;
  const isVacationingMentor =
    isMentorAccount && managedUser.mentor.isVacationing;
  const isMentor = isMentorAccount && !managedUser.mentor.isVacationing;
  const isMentee = managedUser.role === 'mentee';
  const isAdmin = managedUser.role === 'admin';

  const mentorAge = isMentorAccount ? managedUser.mentor.age : 0;
  const mentorRegion = isMentorAccount ? managedUser.mentor.region : '';
  const mentorMessage = isMentorAccount ? managedUser.mentor.statusMessage : '';

  console.log(setVisibleCard);

  return (
    <Container $isMobile={isMobile}>
      {!isMentorAccount ? (
        <Header
          isAdmin={isAdmin}
          isMentor={isMentor}
          isMentee={isMentee}
          isVacationingMentor={isVacationingMentor}
          name={managedUser.nickname}
        />
      ) : (
        <MentorHeader
          isAdmin={isAdmin}
          isMentor={isMentor}
          isMentee={isMentee}
          isVacationingMentor={isVacationingMentor}
          name={managedUser.nickname}
          age={mentorAge}
          region={mentorRegion}
          message={mentorMessage}
        ></MentorHeader>
      )}
      <CardContent managedUser={managedUser} />
    </Container>
  );
};

const Container = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${palette.white};
  border-radius: 0.75rem;
  filter: drop-shadow(-0.5rem 0 0.5rem rgb(0 0 0 / 2%))
    drop-shadow(0.5rem 0 0.5rem rgb(0 0 0 / 2%))
    drop-shadow(0 0.5rem 0.5rem rgb(0 0 0 / 2%));

  ${({ $isMobile }) =>
    $isMobile &&
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
