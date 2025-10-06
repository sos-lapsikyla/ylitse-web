import styled, { css } from 'styled-components';

import { selectActiveChatExists, selectOngoingChatsExist } from './selectors';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import { useAppSelector } from '@/store';

import { CHAT_GAP_WIDTH } from '@/features/Chat/constants';
import { CONTENT_WIDTH, OUTER_VERTICAL_MARGIN } from '@/components/constants';

import ActiveWindow from './components/ActiveWindow';
import Menu from './components/Menu';
import PageWithTransition from '@/components/PageWithTransition';
import WelcomeWindow from './components/WelcomeWindow';

const Chat = () => {
  const { isTablet } = useGetLayoutMode();
  const isActiveChatExisting = useAppSelector(selectActiveChatExists);
  const areOngoingChats = useAppSelector(selectOngoingChatsExist);
  const isDesktopChatOpen = isActiveChatExisting || areOngoingChats;

  return (
    <PageWithTransition>
      {isTablet ? (
        <PageContainer>
          {isActiveChatExisting ? <ActiveWindow /> : <Menu />}
        </PageContainer>
      ) : (
        <PageContainer $isDesktop>
          <Menu />
          {isDesktopChatOpen ? <ActiveWindow /> : <WelcomeWindow />}
        </PageContainer>
      )}
    </PageWithTransition>
  );
};

const PageContainer = styled.div<{ $isDesktop?: boolean }>`
  display: flex;
  ${({ $isDesktop }) =>
    $isDesktop &&
    css`
      gap: ${CHAT_GAP_WIDTH};
      justify-content: center;
      width: ${CONTENT_WIDTH};
      max-width: ${CONTENT_WIDTH};
      margin: ${OUTER_VERTICAL_MARGIN} auto;
    `}
`;

export default Chat;
