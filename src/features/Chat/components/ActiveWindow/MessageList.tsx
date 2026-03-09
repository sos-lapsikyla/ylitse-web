import { useRef, useMemo, Fragment } from 'react';
import type { AppMessage, ChatFolder } from '@/features/Chat/models';

import { useAppDispatch, useAppSelector } from '@/store';
import { addPollParam } from '@/features/Chat/chatSlice';
import { selectBuddyMessages } from '../../selectors';

import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import { useBottomAction } from './ScrollToBottomButton/useBottomAction';
import { useOnScrollToTop } from './useOnScrollToTop';
import { toGroupedMessages } from './mappers';

import styled from 'styled-components';
import { palette } from '@/components/constants';
import { Message } from './Message';
import Spinner from '@/components/Spinner';
import ScrollToBottomButton from './ScrollToBottomButton';
import DateDivider from '@/components/Chat/DateDivider';

type Props = {
  messageList: Array<AppMessage>;
  status: ChatFolder;
  buddyId: string;
  isLoading: boolean;
};

const MessageList = ({ messageList, status, buddyId, isLoading }: Props) => {
  const { isTablet } = useGetLayoutMode();
  const groupedMessages = toGroupedMessages(messageList);
  const {
    unread: { hasUnread },
  } = useAppSelector(selectBuddyMessages(buddyId));

  const dispatch = useAppDispatch();
  const oldestMessage = messageList.length > 0 ? messageList[0].id : '0';
  const historyRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const offsets = useMemo(() => ({ bottom: 20, right: 20 }), []);
  const { isScrolled, handleBottomActionClick } = useBottomAction(
    historyRef,
    buttonRef,
    offsets,
  );

  const handleFetchOlderMessages = (messageId: string, buddyId: string) => {
    if (isLoading) {
      return;
    }

    dispatch(addPollParam({ type: 'OlderThan', buddyId, messageId }));
  };

  useOnScrollToTop({
    ref: historyRef,
    onScrollToTop: () => handleFetchOlderMessages(oldestMessage, buddyId),
  });

  return (
    <ChatHistory ref={historyRef} id="chat-history">
      {isLoading && (
        <SpinnerContainer>
          <Spinner variant="small" isDark isInline />
        </SpinnerContainer>
      )}
      {Object.keys(groupedMessages).map(date => (
        <Fragment key={date}>
          <DateDivider date={date} />
          <Messages>
            {groupedMessages[date].map(message => (
              <Message
                key={message.id}
                folder={status}
                buddyId={buddyId}
                message={message}
              />
            ))}
          </Messages>
        </Fragment>
      ))}
      <ScrollToBottomButton
        ref={buttonRef}
        sizeInPx={isTablet ? 48 : 32}
        variant="down"
        onClick={handleBottomActionClick}
        isVisible={isScrolled}
        hasUnreadMessagesAtBottom={hasUnread}
      />
    </ChatHistory>
  );
};

const ChatHistory = styled.div`
  border-bottom: 1px solid ${palette.greyLight};
  flex: 1;
  overflow: auto;
  padding-bottom: 10px;
  position: relative;
`;

const SpinnerContainer = styled.div`
  padding-top: 1rem;
`;

const Messages = styled.div`
  padding-left: 40px;
  padding-right: 40px;
`;

export default MessageList;
