// Libraries
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';

// Store and hooks
import { selectChats } from '@/features/Chat/selectors';
import { useAppSelector } from '@/store';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

// Variables
import {
  CHAT_MENU_WIDTH,
  CHAT_MIN_HEIGHT,
  ROW_HEIGHT,
} from '@/features/Chat/constants';
import {
  DESKTOP_CONTENT_HEIGHT,
  FOOTER_HEIGHT,
  NAVIGATION_HEIGHT,
  palette,
} from '@/components/constants';

// Components
import FolderLink from './FolderLink';
import Header from './Header';
import Text from '@/components/Text';
import { MenuItem } from './Item';

const Menu = () => {
  const { t } = useTranslation('chat');
  const { isTablet } = useGetLayoutMode();
  const { showFolders, activeFolder } = useAppSelector(state => state.chats);
  const chats = useAppSelector(selectChats);
  const chatsExist = chats.length > 0;

  const showActiveFolderLink =
    showFolders || activeFolder === 'archived' || activeFolder === 'banned';
  const showChatList = !showFolders && chatsExist;
  const showEmptyText = !showFolders && !chatsExist;

  const menuContent = (
    <>
      <Header />
      {showActiveFolderLink && <FolderLink targetFolder="ok" />}
      {showFolders && <FolderLink targetFolder="archived" />}
      {showFolders && <FolderLink targetFolder="banned" />}
      {showChatList && (
        <ChatList
          $isFolderLinkOnTopOfMenu={['archived', 'banned'].includes(
            activeFolder,
          )}
          $isTablet={isTablet}
        >
          {chats.map(buddy => {
            return <MenuItem buddy={buddy} key={buddy.buddyId} />;
          })}
        </ChatList>
      )}
      {showEmptyText && (
        <EmptyText>{t(`menu.empty.${activeFolder}`)}</EmptyText>
      )}
    </>
  );

  return isTablet ? (
    <TabletContainer>{menuContent}</TabletContainer>
  ) : (
    <Container>{menuContent}</Container>
  );
};

const BaseContainer = styled.div`
  background-color: ${palette.white};
`;

const TabletContainer = styled(BaseContainer)`
  position: absolute;
  right: 0;
  left: 0;
`;

const Container = styled(BaseContainer)`
  display: flex;
  flex-direction: column;
  width: ${CHAT_MENU_WIDTH};
  min-width: ${CHAT_MENU_WIDTH};
  height: ${DESKTOP_CONTENT_HEIGHT};
  min-height: ${CHAT_MIN_HEIGHT};
  border-radius: 10px;
  box-shadow: 0 4px 4px rgb(0 0 0 / 3%);
`;

const ChatList = styled.div<{
  $isFolderLinkOnTopOfMenu: boolean;
  $isTablet: boolean;
}>`
  ${({ $isFolderLinkOnTopOfMenu, $isTablet }) =>
    $isTablet
      ? css`
          height: calc(
            100vh -
              (
                ${NAVIGATION_HEIGHT} + ${FOOTER_HEIGHT} +
                  ${$isFolderLinkOnTopOfMenu ? 2 : 1} * ${ROW_HEIGHT}
              )
          );
        `
      : css`
          padding-bottom: 10px;
        `}
  overflow: auto;
`;

const EmptyText = styled(Text)`
  padding: 1.25rem 2rem;
  margin: 0;
`;

export default Menu;
