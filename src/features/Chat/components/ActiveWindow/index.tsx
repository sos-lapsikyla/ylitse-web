import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import {
  selectActiveChat,
  selectIsLoadingBuddyMessages,
} from '@/features/Chat/selectors';
import { selectUserId } from '@/features/Authentication/selectors';
import { setActiveChat } from '@/features/Chat/chatSlice';
import {
  toSendMessage,
  useSendMessageMutation,
} from '@/features/Chat/chatPageApi';
import { useAppDispatch, useAppSelector } from '@/store';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import {
  CHAT_MIN_HEIGHT,
  CHAT_WINDOW_MIN_WIDTH,
} from '@/features/Chat/constants';
import {
  DESKTOP_CONTENT_HEIGHT,
  MOBILE_AND_TABLET_CONTENT_HEIGHT,
  palette,
} from '@/components/constants';
import Header from './Header';
import MessageField from './MessageField';
import MessageList from './MessageList';

const ActiveWindow = () => {
  const { isTablet } = useGetLayoutMode();
  const dispatch = useAppDispatch();
  const [sendMessage] = useSendMessageMutation();
  const userId = useAppSelector(selectUserId);

  const activeChat = useAppSelector(selectActiveChat);

  const [message, setMessage] = useState('');

  const isLoadingBuddyMessages = useAppSelector(
    selectIsLoadingBuddyMessages(activeChat?.buddyId),
  );
  const [isLoadingSentMessage, setIsLoadingSentMessage] = useState(false);
  const isSendingDisabled = isLoadingSentMessage || message.trim().length < 1;

  const handleMessageSend = async () => {
    if (!userId || isLoadingSentMessage) return;

    try {
      setIsLoadingSentMessage(true);
      await sendMessage({
        userId,
        message: toSendMessage(activeChat.buddyId, userId, message),
      }).unwrap();
    } catch (error) {
      setIsLoadingSentMessage(false);
    }
  };

  useEffect(() => {
    dispatch(setActiveChat(activeChat.buddyId));
    setMessage('');
  }, [activeChat.buddyId]);

  // when the message list is updated we clear the message field and stop loading
  useEffect(() => {
    if (isLoadingSentMessage) {
      setMessage('');
      setIsLoadingSentMessage(false);
    }
  }, [activeChat.messages]);

  return (
    activeChat && (
      <Container $isTablet={isTablet}>
        <Header chat={activeChat} />
        <MessageList
          messageList={activeChat.messages}
          buddyId={activeChat.buddyId}
          status={activeChat.status}
          isLoading={isLoadingBuddyMessages}
        />
        {activeChat.status === 'ok' && (
          <MessageField
            handleSend={() => {
              void handleMessageSend();
            }}
            isInputDisabled={isLoadingSentMessage}
            isSendDisabled={isSendingDisabled}
            message={message}
            onChange={setMessage}
          />
        )}
      </Container>
    )
  );
};

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

export default ActiveWindow;
