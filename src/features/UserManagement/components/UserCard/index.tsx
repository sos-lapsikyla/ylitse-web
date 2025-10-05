import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import styled, { css } from 'styled-components';
import { palette } from '@/components/constants';

import type { ManagedUser } from '../../models';
import { Header } from './Header';
import { CardContent } from './CardContent';
import { MentorHeader } from './MentorHeader';
import CardFooter from './CardFooter';

type Props = {
  managedUser: ManagedUser;
};

export const UserCard: React.FC<Props> = ({ managedUser }) => {
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
      <FooterWrapper>
        <CardFooter managedUser={managedUser} />
      </FooterWrapper>
    </Container>
  );
};

const Container = styled.div<{ $isMobile: boolean }>`
  background-color: ${palette.white};
  border-radius: 0.75rem;
  display: flex;
  filter: drop-shadow(-0.5rem 0 0.5rem rgba(0, 0, 0, 0.02))
    drop-shadow(0.5rem 0 0.5rem rgba(0, 0, 0, 0.02))
    drop-shadow(0 0.5rem 0.5rem rgba(0, 0, 0, 0.02));
  flex-direction: column;

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

const FooterWrapper = styled.div`
  opacity: 0;
  transition:
    opacity 0.3s ease,
    visibility 0s linear 0.3s;
  visibility: hidden;

  ${Container}:hover & {
    opacity: 1;
    transition-delay: 0s;
    visibility: visible;
  }
`;

export default UserCard;
