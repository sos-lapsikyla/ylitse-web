import { useState } from 'react';
// Libraries
import styled from 'styled-components';

// Store and hooks, type ChatBuddy
import type { ChatBuddy } from '@/features/Chat/mappers';
import { clearActiveChat } from '@/features/Chat/chatSlice';
import { selectIsMentor } from '@/features/Authentication/userSlice';
import { selectMentorById } from '@/features/MentorPage/selectors';
import { useAppDispatch, useAppSelector } from '@/store';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import { useGetMentorsQuery } from '@/features/MentorPage/mentorPageApi';

// Variables
import {
  CHAT_GAP_WIDTH,
  CHAT_MENU_WIDTH,
  HIGH_ROW_HEIGHT,
  ROW_HEIGHT,
} from '@/features/Chat/constants';
import {
  CONTENT_WIDTH,
  DEFAULT_ICON_SIZE,
  palette,
} from '@/components/constants';

// Components
import ArchivedIcon from '@/static/icons/archived-chats.svg';
import BlockedIcon from '@/static/icons/blocked-chats.svg';
import DesktopButtons from './DesktopButtons';
import { IconButton } from '@/components/Buttons';
import { Profile as ProfileIcon } from '@/components/Icons/Profile';
import TabletButtons from './TabletButtons';
import Text from '@/components/Text';
import { ConfirmationDialog, DialogVariant, ReportDialog } from '../Dialogs';

type Props = {
  chat: ChatBuddy;
};

const Header = ({ chat }: Props) => {
  const { isTablet } = useGetLayoutMode();

  const dispatch = useAppDispatch();
  // Clearing the active chat will return to the menu in tablet mode
  const returnToTabletMenu = () => dispatch(clearActiveChat());

  useGetMentorsQuery();

  const isMentor = useAppSelector(selectIsMentor);
  const mentor = useAppSelector(selectMentorById(chat.buddyId));

  const icons = {
    ok: <ProfileIcon color="purpleDark" />,
    archived: <img src={ArchivedIcon} />,
    banned: <img src={BlockedIcon} />,
  };

  const [dialogVariant, setDialogVariant] = useState<DialogVariant>('archive');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isConfirmDialogOpen = isDialogOpen && dialogVariant !== 'report';
  const isReportDialogOpen = isDialogOpen && dialogVariant === 'report';

  const openDialog = (variant: DialogVariant) => {
    setDialogVariant(variant);
    setIsDialogOpen(true);
  };
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <Container tablet={isTablet}>
      {isTablet && (
        <IconButton
          variant="back"
          sizeInPx={DEFAULT_ICON_SIZE.MEDIUM}
          onClick={returnToTabletMenu}
        />
      )}
      <IconContainer>{icons[chat.status]}</IconContainer>
      <DisplayName variant="h2">{chat.displayName}</DisplayName>
      {isMentor && (
        <MentorBio isTablet={isTablet}>{mentor?.statusMessage}</MentorBio>
      )}

      <ButtonsWrapper>
        {isConfirmDialogOpen && (
          <ConfirmationDialog
            variant={dialogVariant}
            chat={chat}
            close={closeDialog}
          />
        )}
        {isReportDialogOpen && (
          <ReportDialog buddyId={chat.buddyId} close={closeDialog} />
        )}
        {isTablet ? (
          <TabletButtons chat={chat} openDialog={openDialog} />
        ) : (
          <DesktopButtons chat={chat} openDialog={openDialog} />
        )}
      </ButtonsWrapper>
    </Container>
  );
};

const Container = styled.div<{ tablet: boolean }>`
  align-items: center;
  border-bottom: 1px solid ${palette.greyLight};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.03);
  box-sizing: border-box;
  display: flex;
  gap: 30px;
  height: ${({ tablet }) => (tablet ? HIGH_ROW_HEIGHT : ROW_HEIGHT)};
  justify-content: flex-start;
  padding: 14px 40px;
  width: ${({ tablet }) =>
    tablet
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

const MentorBio = styled(Text)<{ isTablet: boolean }>`
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ButtonsWrapper = styled.div`
  margin-left: auto;
`;

export default Header;
