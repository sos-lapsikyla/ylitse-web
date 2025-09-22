// Libraries
import { ReactNode, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Store and hooks
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

// Variables
import {
  Color,
  FOOTER_HEIGHT,
  MOBILE_AND_TABLET_CONTENT_HEIGHT,
  NAVIGATION_HEIGHT,
  palette,
} from '../constants';

type Props = {
  children: ReactNode;
};

const TRANSITION_LENGTH = 0.7;

const PageWithTransition: React.FC<Props> = ({ children }) => {
  const { isTablet } = useGetLayoutMode();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setShowContent(true);
    }, TRANSITION_LENGTH * 1000);
    return () => clearTimeout(timerId);
  }, []);

  return (
    <Container $isTablet={isTablet}>
      {showContent && children}
      <Layer role="transition" $color="blue2" $delay={0} />
      <Layer role="transition" $color="purple" $delay={0.3} />
      <Layer role="transition" $color="white" $delay={0.12} />
      <Layer role="transition" $color="orange2" $delay={0.08} />
    </Container>
  );
};

const Container = styled.div<{ $isTablet: boolean }>`
  background-color: ${palette.blueLight};
  display: flex;
  flex-direction: column;
  height: auto;
  left: 0;
  min-height: ${({ $isTablet }) =>
    $isTablet
      ? MOBILE_AND_TABLET_CONTENT_HEIGHT
      : `calc(100vh - ${NAVIGATION_HEIGHT} - ${FOOTER_HEIGHT})`};
  position: relative;
  top: 0;
  width: 100vw;
`;

const sweep = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
`;

const Layer = styled.div<{
  $color: Color;
  $delay: number;
}>`
  animation: ${sweep} ${TRANSITION_LENGTH}s cubic-bezier(0.645, 0.045, 0.355, 1)
    both;
  animation-delay: ${({ $delay }) => $delay}s;
  background: ${({ $color }) => palette[$color]};
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  z-index: 1000;
`;

export default PageWithTransition;
