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

  // console.log('isit',isMentorAccount)
  // console.log('isvacationingme', isVacationingMentor)
  //   if (managedUser.role === "mentor" && "mentor" in managedUser && managedUser.mentor.isVacationing) {
  //   console.log('heii',managedUser.mentor.isVacationing);
  // }
  // if (isMentorAccount && 'mentor' in managedUser) {
  //   console.log('mentor vacation:', managedUser.mentor.gender);
  // }
  // const isVacationingMentor = managedUser.role === 'mentor' && managedUser.mentor === true;
  const isMentorAccount =
    managedUser.role === 'mentor' && 'mentor' in managedUser;
  const isVacationingMentor =
    isMentorAccount && managedUser.mentor.isVacationing;
  const isMentor = isMentorAccount && !managedUser.mentor.isVacationing;
  const isMentee = managedUser.role === 'mentee';
  const isAdmin = managedUser.role === 'admin';

  console.log(setVisibleCard);

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
