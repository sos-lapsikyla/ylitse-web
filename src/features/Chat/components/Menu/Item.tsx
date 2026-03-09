import { useAppSelector, useAppDispatch } from '@/store';
import {
  selectActiveChat,
  selectActiveFolder,
  selectBuddyMessages,
  selectIsArchivedFolder,
  selectIsDefaultFolder,
} from '@/features/Chat/selectors';
import { setActiveChat } from '@/features/Chat/chatSlice';

import type { ChatBuddy } from '@/features/Chat/mappers';

import { folderColors } from '@/features/Chat/constants';
import { ChatMenuItem } from '@/components/Chat';

type Props = {
  buddy: ChatBuddy;
};

export const MenuItem = ({ buddy }: Props) => {
  const { buddyId, displayName } = buddy;
  const {
    unread: { hasUnread, count },
    latest,
    isLoading,
  } = useAppSelector(selectBuddyMessages(buddyId));
  const activeFolder = useAppSelector(selectActiveFolder);
  const isDefaultFolder = useAppSelector(selectIsDefaultFolder);
  const isArchived = useAppSelector(selectIsArchivedFolder);
  const activeChat = useAppSelector(selectActiveChat);
  const isActiveChat = buddyId === activeChat?.buddyId;

  const dispatch = useAppDispatch();
  const openChat = () => dispatch(setActiveChat(buddyId));

  const getProfileIconColor = () => {
    if (isActiveChat) return 'blueDark';
    if (isDefaultFolder) return 'purpleDark';
    if (isArchived) return 'orangeDark';
    return 'redDark';
  };

  const isUnseenDotVisible = isDefaultFolder && hasUnread;

  return (
    <ChatMenuItem
      backgroundColor={folderColors[activeFolder]}
      displayName={displayName}
      isActiveChat={isActiveChat}
      isLoading={isLoading}
      isUnseenDotVisible={isUnseenDotVisible}
      newMessageCount={count}
      latestMessage={latest}
      openChat={openChat}
      profileIconColor={getProfileIconColor()}
    />
  );
};
