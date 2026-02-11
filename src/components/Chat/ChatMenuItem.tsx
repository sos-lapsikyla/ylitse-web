import styled, { css } from 'styled-components';
import { Color, palette } from '../constants';
import Text from '../Text';
import { Profile as ProfileIcon } from '../Icons/Profile';
import Spinner from '../Spinner';
import { Row } from '@/features/Chat/components/Menu/Row';

type Props = {
  backgroundColor: {
    active: string;
    hover: string;
  };
  displayName: string;
  isActiveChat: boolean;
  isLoading: boolean;
  isUnseenDotVisible: boolean;
  newMessageCount?: number;
  latestMessage?: string;
  openChat?: () => void;
  profileIconColor: Color;
};

const ChatMenuItem: React.FC<Props> = ({
  backgroundColor,
  displayName,
  isActiveChat,
  isLoading,
  isUnseenDotVisible,
  newMessageCount,
  latestMessage,
  openChat,
  profileIconColor,
}) => {
  return (
    <ItemRow
      $isActive={isActiveChat}
      $background={backgroundColor}
      onClick={openChat}
    >
      <ProfileIcon color={profileIconColor} />
      <MentorInfo>
        <BuddyName>
          <Text variant="bold">{displayName}</Text>
          {isUnseenDotVisible && (
            <UnseenDot id="unseen-messages-dot-conversation">
              {newMessageCount}
            </UnseenDot>
          )}
        </BuddyName>
        {isLoading ? (
          <Spinner variant="tiny" isDark isInline isCentered={false} />
        ) : (
          <Message>{latestMessage}</Message>
        )}
      </MentorInfo>
    </ItemRow>
  );
};

const ItemRow = styled(Row)<{
  $isActive: boolean;
  $background: { active: string; hover: string };
}>`
  cursor: pointer;
  overflow: hidden;

  ${({ $isActive, $background }) =>
    $isActive
      ? css`
          background-color: ${$background.active};
        `
      : css`
          &:hover {
            background-color: ${$background.hover};
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

export default ChatMenuItem;
