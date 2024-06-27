import styled, { css } from 'styled-components';

import { selectAnyChats, selectIsActiveChat } from './chatSlice';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import { useAppSelector } from '@/store';

import { CHAT_GAP_WIDTH } from '@/features/Chat/constants';
import { CONTENT_WIDTH, OUTER_VERTICAL_MARGIN } from '@/components/variables';

import ActiveWindow from './components/ActiveWindow';
import Menu from './components/Menu';
import PageWithTransition from '@/components/PageWithTransition';
import WelcomeWindow from './components/WelcomeWindow';

const Chat = () => {
  const { isTablet } = useGetLayoutMode();
  const isActiveChat: boolean = useAppSelector(selectIsActiveChat);
  const anyChats: boolean = useAppSelector(selectAnyChats);

  return (
    <PageWithTransition>
      {isTablet ? (
        <PageContainer>
          {isActiveChat ? <ActiveWindow /> : <Menu />}
        </PageContainer>
      ) : (
        <PageContainer isDesktop>
          <Menu />
          {anyChats ? <ActiveWindow /> : <WelcomeWindow />}
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
