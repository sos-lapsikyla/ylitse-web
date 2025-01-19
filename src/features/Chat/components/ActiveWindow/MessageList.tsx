import { useRef, useMemo, Fragment } from 'react';
import type { AppMessage, ChatFolder } from '@/features/Chat/models';

import { useAppDispatch, useAppSelector } from '@/store';
import { addPollParam } from '@/features/Chat/chatSlice';
import { selectBuddyMessages } from '../../selectors';

import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import { useBottomAction } from './ScrollToBottomButton/useBottomAction';
import { useOnScrollToTop } from './useOnScrollToTop';
import { toGroupedMessages } from './mappers';

import styled, { css } from 'styled-components';
import { palette } from '@/components/constants';
import { Message } from './Message';
import Text from '@/components/Text';
import Spinner from '@/components/Spinner';
import ScrollToBottomButton from './ScrollToBottomButton';

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
  const historyRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

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
    <ChatHistory ref={historyRef} aria-label="chat-history">
      {isLoading && <Spinner variant="small" isDark />}
      {Object.keys(groupedMessages).map(date => (
        <Fragment key={date}>
          <DateDivider isTablet={isTablet}>{date}</DateDivider>
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

const DateDivider = styled(Text)<{ isTablet: boolean }>`
  position: relative;
  text-align: center;
  ${({ isTablet }) =>
    !isTablet &&
    css`
      margin-left: 40px;
      margin-right: 40px;
    `}

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    width: ${({ isTablet }) => (isTablet ? '30%' : '40%')};
    height: 1px;
    background-color: ${palette.purple}};
  }

  &:before {
    left: 0;
  }

  &:after {
    right: 0;
  }
`;

const Messages = styled.div`
  padding-left: 40px;
  padding-right: 40px;
`;

export default MessageList;
