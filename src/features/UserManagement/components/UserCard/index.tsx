import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import styled, { css } from 'styled-components';
import { CONTENT_WIDTH, palette, spacing } from '@/components/constants';
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
  flex-direction: column;
  max-width: 440px;
  min-width: 300px;
  max-height: 42.5rem;
  filter: drop-shadow(-0.5rem 0 0.5rem rgba(0, 0, 0, 0.01)) 
        drop-shadow(0.5rem 0 0.5rem rgba(0, 0, 0, 0.01))
        drop-shadow(0 0.5rem 0.5rem rgba(0, 0, 0, 0.01));
   }

  ${({ isMobile }) =>
    isMobile &&
    css`
      margin: 1rem 0;
      max-height: 40%;
      scroll-behavior: smooth;
      scroll-snap-align: center;

      &:first-child {
        margin-left: 1.5rem;
      }

      &:last-child {
        margin-right: 1.5rem;
      }
    `}

      ${({ isMobile }) =>
        !isMobile &&
        css`
          flex: 0 0 30%;
          flex-wrap: wrap;
          margin: ${spacing.layout_spacing};
          max-width: calc(
            ((${CONTENT_WIDTH} + ${spacing.layout_spacing} * 2) / 3) -
              (${spacing.layout_spacing} * 2)
          );

          @media screen and (min-width: 2550px) {
            flex: 0 0 20%;
            max-width: calc(
              ((${CONTENT_WIDTH} + ${spacing.layout_spacing} * 2) / 5) -
                (${spacing.layout_spacing} * 2)
            );
          }
          @media screen and (min-width: 1950px) {
            flex: 0 0 25%;
            max-width: calc(
              ((${CONTENT_WIDTH} + ${spacing.layout_spacing} * 2) / 4) -
                (${spacing.layout_spacing} * 2)
            );
          }
          @media screen and (max-width: 1500px) {
            flex: 0 0 30%;
            max-width: calc(
              ((1130px + (${spacing.layout_spacing} * 2)) / 3) -
                (${spacing.layout_spacing} * 2)
            );
          }
          @media screen and (max-width: 1200px) {
            flex: 0 0 50%;
            max-width: calc((100vw / 2) - (${spacing.layout_spacing} * 2));
          }
        `}
  
`;

export default UserCard;
