import { ReactNode } from 'react';

import styled from 'styled-components';
import { CONTENT_WIDTH, ICON_SIZES, palette } from '../constants';
import {
  CHAT_GAP_WIDTH,
  CHAT_MENU_WIDTH,
  HIGH_ROW_HEIGHT,
  ROW_HEIGHT,
} from '@/features/Chat/constants';

import Text from '../Text';
import { IconButton } from '../Buttons';

import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

type Props = {
  children?: ReactNode;
  onBack: () => void;
  icon: React.ReactNode;
  displayName: string;
  isChatBuddyMentor: boolean;
  mentorBio?: string;
};

const ChatWindowHeader: React.FC<Props> = ({
  children,
  onBack,
  icon,
  isChatBuddyMentor,
  mentorBio,
  displayName,
}) => {
  const { isTablet } = useGetLayoutMode();

  return (
    <Container $isTablet={isTablet}>
      {isTablet && (
        <IconButton
          variant="back"
          sizeInPx={ICON_SIZES.LARGE}
          onClick={onBack}
        />
      )}
      <IconContainer>{icon}</IconContainer>
      <DisplayName variant="h2">{displayName}</DisplayName>
      {isChatBuddyMentor && <MentorBio>{mentorBio}</MentorBio>}
      <ButtonsWrapper>{children}</ButtonsWrapper>
    </Container>
  );
};

export default ChatWindowHeader;

const Container = styled.div<{ $isTablet: boolean }>`
  align-items: center;
  border-bottom: 1px solid ${palette.greyLight};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.03);
  box-sizing: border-box;
  display: flex;
  gap: 30px;
  height: ${({ $isTablet }) => ($isTablet ? HIGH_ROW_HEIGHT : ROW_HEIGHT)};
  justify-content: flex-start;
  padding: 14px 40px;
  width: ${({ $isTablet }) =>
    $isTablet
      ? '100vw'
      : `calc(${CONTENT_WIDTH}-${CHAT_MENU_WIDTH}-${CHAT_GAP_WIDTH}})`};
`;

const IconContainer = styled.div`
  flex-shrink: 0;
`;

const DisplayName = styled(Text)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MentorBio = styled(Text)`
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ButtonsWrapper = styled.div`
  margin-left: auto;
`;
