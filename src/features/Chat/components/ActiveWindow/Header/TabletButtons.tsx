// Libraries
import styled from 'styled-components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Types
import type { ChatBuddy } from '@/features/Chat/mappers';

// Variables
import { HIGH_ROW_HEIGHT } from '@/features/Chat/constants';
import { ICON_SIZES, palette } from '@/components/constants';

// Components
import { Button, IconButton, StatusButton } from '@/components/Buttons';
import { useAppSelector } from '@/store';
import { selectIsMentee } from '@/features/Authentication/selectors';

type DialogVariant = 'archive' | 'block' | 'restore' | 'unblock';

type Props = {
  chat: ChatBuddy;
  confirmStatusChange: (variant: DialogVariant) => void;
  openReportModal: () => void;
};

const TabletButtons = ({
  chat,
  confirmStatusChange,
  openReportModal,
}: Props) => {
  const { t } = useTranslation('chat');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);
  const isMentee = useAppSelector(selectIsMentee);

  const confirmAction = (variant: DialogVariant) => {
    closeDropdown();
    confirmStatusChange(variant);
  };

  const showReportModal = () => {
    closeDropdown();
    openReportModal();
  };

  return (
    <Container>
      <IconButton
        variant="menuLines"
        sizeInPx={ICON_SIZES.LARGE}
        onClick={toggleDropdown}
      />
      {isDropdownOpen && (
        <Dropdown>
          {chat.status === 'ok' && (
            <>
              <TabletStatusButton
                onClick={() => confirmAction('archive')}
                icon="archive"
                text={t('header.archive')}
              />
              <TabletStatusButton
                onClick={() => confirmAction('block')}
                icon="block"
                text={t('header.block')}
              />
            </>
          )}
          {chat.status === 'archived' && (
            <TabletStatusButton
              onClick={() => confirmAction('restore')}
              icon="return"
              text={t('header.restore')}
            />
          )}
          {chat.status === 'banned' && (
            <TabletStatusButton
              onClick={() => confirmAction('unblock')}
              icon="return"
              text={t('header.unblock')}
            />
          )}
          {isMentee && (
            <ReportButton
              onClick={showReportModal}
              leftIcon={'danger'}
              sizeInPx={ICON_SIZES.SMALL}
              text={{
                color: 'purple',
                text: t('header.report'),
                variant: 'link',
              }}
            />
          )}
        </Dropdown>
      )}
    </Container>
  );
};

const Container = styled.div`
  align-items: center;
  display: flex;
  gap: 30px;
`;

const Dropdown = styled.div`
  background-color: ${palette.white};
  border-radius: 0px 0px 4px 4px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  position: absolute;
  right: 40px;
  top: ${HIGH_ROW_HEIGHT};
  z-index: 5;
`;

const TabletStatusButton = styled(StatusButton)`
  padding: 10px 40px 0px;
`;

const ReportButton = styled(Button)`
  padding: 10px 40px 10px;
`;

export default TabletButtons;
