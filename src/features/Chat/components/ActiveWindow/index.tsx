import { useEffect, useState } from 'react';

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

import Header from './Header';
import MessageField from './MessageField';
import MessageList from './MessageList';
import ChatWindow from '@/components/Chat/ChatWindow';

const ActiveWindow = () => {
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

  useEffect(() => {
    if (isLoadingSentMessage) {
      setMessage('');
      setIsLoadingSentMessage(false);
    }
  }, [activeChat.messages]);

  return (
    activeChat && (
      <ChatWindow>
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
      </ChatWindow>
    )
  );
};

export default ActiveWindow;
