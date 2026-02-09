import { ChatListContainer } from '@/components/Chat';
import { MenuItem } from '@/features/Chat/components/Menu/Item';
import { selectChats } from '@/features/Chat/selectors';
import { useAppSelector } from '@/store';
import ReportedChatWindow from './ReportedChatWindow';
import { useTranslation } from 'react-i18next';
import { CHAT_GAP_WIDTH } from '@/features/Chat/constants';
import { CONTENT_WIDTH, OUTER_VERTICAL_MARGIN } from '@/components/constants';
import styled, { css } from 'styled-components';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

type Props = {
  reopenReport: () => void;
};

const ChatInspection: React.FC<Props> = ({ reopenReport }) => {
  const { t } = useTranslation('reports');
  const { isTablet } = useGetLayoutMode();
  const chats = useAppSelector(selectChats);

  return isTablet ? (
    <ReportedChatWindow />
  ) : (
    <PageContainer $isDesktop>
      <ChatListContainer
        header="Mentorin nimi tähän"
        navigateBackText={t('chatInspection.back')}
        onClick={() => reopenReport()}
      >
        <MenuItem buddy={chats[0]} />
      </ChatListContainer>
      <ReportedChatWindow />
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
