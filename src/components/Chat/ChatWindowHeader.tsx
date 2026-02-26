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
  const { isMobile } = useGetLayoutMode();
  const shouldIconBeVisible = !isMobile;

  return (
    <Container $isTablet={isTablet}>
      {isTablet && (
        <IconButton
          variant="back"
          sizeInPx={ICON_SIZES.LARGE}
          onClick={onBack}
        />
      )}
      {shouldIconBeVisible && <IconContainer>{icon}</IconContainer>}
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
  gap: ${({ $isTablet }) => ($isTablet ? '15px' : '30px')};
  justify-content: flex-start;
  min-height: ${({ $isTablet }) => ($isTablet ? HIGH_ROW_HEIGHT : ROW_HEIGHT)};
  padding: 14px 40px;
  width: ${({ $isTablet }) =>
    $isTablet
      ? '100vw'
      : `calc(${CONTENT_WIDTH}-${CHAT_MENU_WIDTH}-${CHAT_GAP_WIDTH})`};
`;

const IconContainer = styled.div`
  flex-shrink: 0;
`;

const DisplayName = styled(Text)`
  -ms-overflow-style: none;
  flex: 0 1 auto;
  line-height: 1.4;
  max-height: calc(1.4em * 2);

  /* Limit height to 2 lines */
  min-width: 0;
  overflow-x: hidden;

  overflow-y: auto;
  scrollbar-width: none;

  white-space: normal;
  word-break: break-word;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MentorBio = styled(Text)`
  flex: 0 1 auto;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ButtonsWrapper = styled.div`
  flex: 0 2 auto;
  margin-left: auto;
`;
