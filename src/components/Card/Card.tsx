import styled, { css } from 'styled-components';
import { palette } from '../constants';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  headerSize: 'small' | 'large';
};

const Card: React.FC<Props> = ({ children, headerSize }: Props) => {
  const { isMobile } = useGetLayoutMode();

  return (
    <Container $isMobile={isMobile}>
      <CardContent $isMobile={isMobile} $headerSize={headerSize}>
        {children}
      </CardContent>
    </Container>
  );
};

const CardContent = styled.div<{
  $isMobile: boolean;
  $headerSize: 'small' | 'large';
}>`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  margin-top: ${({ $headerSize }) =>
    $headerSize === 'small' ? '7rem' : '10rem'};
  max-height: 32.5rem;
  padding: 0 2rem 2rem 2rem;
`;

const Container = styled.div<{ $isMobile: boolean }>`
  background-color: ${palette.white};
  border-radius: 0.75rem;
  box-sizing: border-box;
  display: flex;
  filter: drop-shadow(-0.5rem 0 0.5rem rgba(0, 0, 0, 0.02))
    drop-shadow(0.5rem 0 0.5rem rgba(0, 0, 0, 0.02))
    drop-shadow(0 0.5rem 0.5rem rgba(0, 0, 0, 0.02));
  flex-direction: column;
  max-height: 680px;
  max-width: 440px;
  width: 100%;

  ${({ $isMobile }) =>
    $isMobile &&
    css`
      margin: 0 auto;
      max-width: 350px;
      width: 100%;
    `}
`;

export default Card;
