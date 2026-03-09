import styled, { css } from 'styled-components';
import {
  DESKTOP_CONTENT_HEIGHT,
  MOBILE_AND_TABLET_CONTENT_HEIGHT,
  palette,
} from '../constants';
import {
  CHAT_MIN_HEIGHT,
  CHAT_WINDOW_MIN_WIDTH,
} from '@/features/Chat/constants';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};
const ChatWindow: React.FC<Props> = ({ children }) => {
  const { isTablet } = useGetLayoutMode();

  return <Container $isTablet={isTablet}>{children}</Container>;
};

export default ChatWindow;

const Container = styled.div<{ $isTablet: boolean }>`
  background-color: ${palette.white};
  border-radius: 10px;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  height: ${({ $isTablet }) =>
    $isTablet ? MOBILE_AND_TABLET_CONTENT_HEIGHT : DESKTOP_CONTENT_HEIGHT};
  min-height: ${CHAT_MIN_HEIGHT};
  ${({ $isTablet }) =>
    !$isTablet &&
    css`
      min-width: ${CHAT_WINDOW_MIN_WIDTH};
    `};
`;
