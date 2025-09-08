import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import styled, { css } from 'styled-components';
import { palette } from '@/components/constants';
import { Header } from './Header';
import { ManagedUser } from '../../models';

type Props = {
  // setVisibleCard: (user: User) => void;
  user: ManagedUser;
};

export const UserCard: React.FC<Props> = ({
  //  setVisibleCard,
  user,
}) => {
  const { isMobile } = useGetLayoutMode();

  return (
    <Container isMobile={isMobile}>
      <Header name={user.name}></Header>
      <CardContent isMobile={isMobile}></CardContent>
    </Container>
  );
};

const Container = styled.div<{ isMobile: boolean }>`
  background-color: ${palette.white};
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;
  max-width: 450px;
  min-width: 300px;
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
`;

const CardContent = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1.5rem;
  justify-content: space-between;
  padding: ${({ isMobile }) => (isMobile ? '1.5rem' : '2.5rem')};
`;

export default UserCard;
