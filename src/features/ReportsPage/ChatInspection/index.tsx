import { useState } from 'react';

import { ChatListContainer, ChatMenuItem } from '@/components/Chat';
import ReportedChatWindow from './ReportedChatWindow';

import { useAppSelector } from '@/store';
import { useTranslation } from 'react-i18next';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import { selectMentorById } from '@/features/MentorPage/selectors';
import { useGetMentorsQuery } from '@/features/MentorPage/mentorPageApi';
import { selectManagedUserById } from '@/features/UserManagement/selectors';
import { useGetManagedUsersQuery } from '@/features/UserManagement/userManagementApi';

import { CHAT_GAP_WIDTH } from '@/features/Chat/constants';
import { CONTENT_WIDTH, OUTER_VERTICAL_MARGIN } from '@/components/constants';
import styled, { css } from 'styled-components';

import { folderColors } from '@/features/Chat/constants';

type Props = {
  recipientId: string;
  senderId: string;
  reopenReport: () => void;
};

const ChatInspection: React.FC<Props> = ({
  recipientId,
  senderId,
  reopenReport,
}) => {
  const { t } = useTranslation('reports');
  const { isTablet } = useGetLayoutMode();

  useGetMentorsQuery();
  useGetManagedUsersQuery();
  const mentor = useAppSelector(selectMentorById(recipientId));
  const mentee = useAppSelector(selectManagedUserById(senderId));

  const [showMenteesIdentity, setShowMenteesIdentity] = useState(false);
  const toggleCheckbox = () => {
    setShowMenteesIdentity(!showMenteesIdentity);
  };

  return isTablet ? (
    <ReportedChatWindow
      onBack={() => reopenReport()}
      senderId={senderId}
      recipientId={recipientId}
      mentee={mentee}
      toggleCheckbox={toggleCheckbox}
      showMenteesIdentity={showMenteesIdentity}
    />
  ) : (
    <PageContainer $isDesktop>
      <ChatListContainer
        header={
          mentor ? mentor.name : t('chatInspection.mentorPlaceholderName')
        }
        navigateBackText={t('chatInspection.back')}
        onClick={() => reopenReport()}
      >
        <ChatMenuItem
          backgroundColor={folderColors['ok']}
          displayName={
            mentee && showMenteesIdentity
              ? mentee?.nickname
              : t('chatInspection.placeholderName')
          }
          isActiveChat={true}
          isLoading={false}
          isUnseenDotVisible={false}
          profileIconColor={'blueDark'}
        />
      </ChatListContainer>
      <ReportedChatWindow
        onBack={() => reopenReport()}
        senderId={senderId}
        recipientId={recipientId}
        mentee={mentee}
        toggleCheckbox={toggleCheckbox}
        showMenteesIdentity={showMenteesIdentity}
      />
    </PageContainer>
  );
};

const PageContainer = styled.div<{ $isDesktop?: boolean }>`
  display: flex;
  ${({ $isDesktop }) =>
    $isDesktop &&
    css`
      gap: ${CHAT_GAP_WIDTH};
      justify-content: center;
      margin: ${OUTER_VERTICAL_MARGIN} auto;
      max-width: ${CONTENT_WIDTH};
      width: ${CONTENT_WIDTH};
    `}
`;
export default ChatInspection;
