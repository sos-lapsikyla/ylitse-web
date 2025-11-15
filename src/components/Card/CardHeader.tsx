import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import { ReactNode } from 'react';
import { palette } from '../constants';
import styled from 'styled-components';

type Props = {
  color: string;
  size: 'small' | 'large';
  children: ReactNode;
};
const CardHeader: React.FC<Props> = ({ color, size, children }) => {
  const { isMobile } = useGetLayoutMode();

  return (
    <HeaderContainer $isMobile={isMobile} $color={color} $size={size}>
      {children}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div<{
  $isMobile: boolean;
  $color: string;
  $size: string;
}>`
  align-items: center;
  background-color: ${({ $color }) => $color};
  border-radius: 0.75rem;
  box-sizing: border-box;
  color: ${palette.white};
  display: flex;
  height: ${({ $size }) => ($size === 'small' ? '4rem' : '7rem')};
  left: 0;
  max-height: 7rem;
  padding: ${({ $isMobile }) => ($isMobile ? '1.5rem' : '2.5rem')};
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
`;

export default CardHeader;
