import { useEffect } from 'react';
import styled, { css } from 'styled-components';

import {
  selectActiveChat,
  selectIsLoadingBuddyMessages,
  selectDefaultChat,
  setActiveChat,
} from '@/features/Chat/chatSlice';
import { useAppDispatch, useAppSelector } from '@/store';
import { useSendMessageMutation } from '@/features/Chat/chatPageApi';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import {
  CHAT_MIN_HEIGHT,
  CHAT_WINDOW_MIN_WIDTH,
} from '@/features/Chat/constants';
import {
  DESKTOP_CONTENT_HEIGHT,
  MOBILE_AND_TABLET_CONTENT_HEIGHT,
  palette,
} from '@/components/variables';

import Header from './Header';
import MessageField from './MessageField';
import MessageList from './MessageList';

const ActiveWindow = () => {
  const { isTablet } = useGetLayoutMode();
  const dispatch = useAppDispatch();

  const activeChat = useAppSelector(selectActiveChat);
  const defaultChat = useAppSelector(selectDefaultChat);
  const chat = activeChat ?? defaultChat;

  useEffect(() => {
    dispatch(setActiveChat(chat.buddyId));
  }, [chat.buddyId]);

  const [, { isLoading: isLoadingSendMessage }] = useSendMessageMutation();

  const isLoadingMessages = useAppSelector(
    selectIsLoadingBuddyMessages(chat?.buddyId),
  );

  const isLoading = isLoadingSendMessage || isLoadingMessages;

  return (
    chat && (
      <Container isTablet={isTablet}>
        <Header chat={chat} />
        <MessageList
          messageList={chat.messages}
          buddyId={chat.buddyId}
          status={chat.status}
          isLoading={isLoading}
        />
        {chat.status === 'ok' && <MessageField chat={chat} />}
      </Container>
    )
  );
};

const Container = styled.div<{ isTablet: boolean }>`
  background-color: ${palette.white};
  border-radius: 10px;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  height: ${({ isTablet }) =>
    isTablet ? MOBILE_AND_TABLET_CONTENT_HEIGHT : DESKTOP_CONTENT_HEIGHT};
  min-height: ${CHAT_MIN_HEIGHT};
  ${({ isTablet }) =>
    !isTablet &&
    css`
      min-width: ${CHAT_WINDOW_MIN_WIDTH};
    `};
`;

export default ActiveWindow;
