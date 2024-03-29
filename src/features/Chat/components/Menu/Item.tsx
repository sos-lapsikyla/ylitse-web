import { useAppSelector, useAppDispatch } from '@/store';
import { selectBuddyMessages, setActiveChat } from '@/features/Chat/chatSlice';

import type { ChatBuddy } from '@/features/Chat/chatSlice';

import styled, { css } from 'styled-components';
import { folderColors } from '@/features/Chat/constants';
import { palette } from '@/components/variables';
import { Profile as ProfileIcon } from '@/components/Icons/Profile';
import { Row } from './Row';
import Text from '@/components/Text';
import Spinner from '@/components/Spinner';

type Props = {
  buddy: ChatBuddy;
};

export const MenuItem = ({ buddy }: Props) => {
  const {
    unread: { hasUnread, count },
    latest,
    isLoading,
  } = useAppSelector(selectBuddyMessages(buddy.buddyId));
  const activeFolder = useAppSelector(state => state.chats.activeFolder);
  const activeChatId = useAppSelector(state => state.chats.activeChatId);

  const dispatch = useAppDispatch();

  const openChat = () => {
    dispatch(setActiveChat(buddy.buddyId));
  };

  return (
    <ItemRow
      active={buddy.buddyId === activeChatId}
      background={folderColors[activeFolder]}
      onClick={openChat}
    >
      <ProfileIcon
        color={
          buddy.buddyId === activeChatId
            ? 'blueDark'
            : activeFolder === 'ok'
              ? 'purpleDark'
              : activeFolder === 'archived'
                ? 'orangeDark'
                : 'redDark'
        }
      />
      <MentorInfo>
        <BuddyName>
          <Text variant="boldSource">{buddy.displayName}</Text>
          {hasUnread && <Badge>{count}</Badge>}
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

const Badge = styled.div`
  align-items: center;
  background-color: ${palette.blue2};
  border-radius: 50%;
  color: ${palette.blueDark};
  display: flex;
  font-family: 'Source Sans Pro';
  font-size: '1rem',
  font-weight: 600;
  height: 27px;
  justify-content: center;
  margin-left: 10px;
  width: 27px;
`;
