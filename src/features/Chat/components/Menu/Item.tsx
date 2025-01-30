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

import styled, { css } from 'styled-components';
import { folderColors } from '@/features/Chat/constants';
import { palette } from '@/components/constants';
import { Profile as ProfileIcon } from '@/components/Icons/Profile';
import { Row } from './Row';
import Text from '@/components/Text';
import Spinner from '@/components/Spinner';

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
    <ItemRow
      active={isActiveChat}
      background={folderColors[activeFolder]}
      onClick={openChat}
    >
      <ProfileIcon color={getProfileIconColor()} />
      <MentorInfo>
        <BuddyName>
          <Text variant="bold">{displayName}</Text>
          {isUnseenDotVisible && (
            <UnseenDot id="unseen-messages-dot-conversation">{count}</UnseenDot>
          )}
        </BuddyName>
        {isLoading ? (
          <Spinner variant="tiny" isDark centered={false} />
        ) : (
          <Message>{latest}</Message>
        )}
      </MentorInfo>
    </ItemRow>
  );
};

const ItemRow = styled(Row)<{
  active: boolean;
  background: { active: string; hover: string };
}>`
  cursor: pointer;
  overflow: hidden;

  ${({ active, background }) =>
    active
      ? css`
          background-color: ${background.active};
        `
      : css`
          &:hover {
            background-color: ${background.hover};
          }
        `}
`;

const MentorInfo = styled.div`
  color: ${palette.blueDark};
  margin-left: 20px;
  padding-bottom: 15px;
  padding-top: 15px;
  width: 240px;
`;

const BuddyName = styled.div`
  display: flex;
  flex-direction: row;
`;

const Message = styled(Text)`
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const UnseenDot = styled.div`
  align-items: center;
  background-color: ${palette.blue2};
  border-radius: 50%;
  color: ${palette.blueDark};
  display: flex;
  font-family: 'Source Sans 3';
  font-size: '1rem',
  font-weight: 600;
  height: 27px;
  justify-content: center;
  margin-left: 10px;
  width: 27px;
`;
