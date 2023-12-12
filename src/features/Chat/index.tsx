// Libraries
import styled, { css } from 'styled-components';

// Store and hooks
import { selectActiveChat } from './chatSlice';
import { useTabletMode } from '@/hooks/useTabletMode';
import { useAppSelector } from '@/store';

// Variables
import { CHAT_GAP_WIDTH } from '@/features/Chat/constants';
import { CONTENT_WIDTH, OUTER_VERTICAL_MARGIN } from '@/components/variables';

// Components
import ActiveWindow from './components/ActiveWindow';
import Menu from './components/Menu';
import PageWithTransition from '@/components/PageWithTransition';
import WelcomeWindow from './components/WelcomeWindow';

const Chat = () => {
  const isTablet = useTabletMode();
  const chat = useAppSelector(selectActiveChat);

  return (
    <PageWithTransition>
      {isTablet ? (
        <PageContainer>{chat ? <ActiveWindow /> : <Menu />}</PageContainer>
      ) : (
        <PageContainer isDesktop>
          <Menu />
          {chat ? <ActiveWindow /> : <WelcomeWindow />}
        </PageContainer>
      )}
    </PageWithTransition>
  );
};

const PageContainer = styled.div<{ isDesktop?: boolean }>`
  display: flex;
  ${({ isDesktop }) =>
    isDesktop &&
    css`
      gap: ${CHAT_GAP_WIDTH};
      justify-content: center;
      margin: ${OUTER_VERTICAL_MARGIN} auto;
      max-width: ${CONTENT_WIDTH};
      width: ${CONTENT_WIDTH};
    `}
`;

export default Chat;
