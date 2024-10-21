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

type DialogVariant = 'archive' | 'block' | 'restore';

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

  const openDialogVariant = (variant: DialogVariant) => {
    closeDropdown();
    confirmStatusChange(variant);
  };

  const openArchiveDialog = () => openDialogVariant('archive');
  const openBlockDialog = () => openDialogVariant('block');
  const openRestoreDialog = () => openDialogVariant('restore');
  const openReportDialog = () => {
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
          {chat.status === 'ok' ? (
            <>
              <TabletStatusButton
                onClick={openArchiveDialog}
                icon="archive"
                text={t('header.archive')}
              />
              <TabletStatusButton
                onClick={openBlockDialog}
                icon="block"
                text={t('header.block')}
              />
            </>
          ) : (
            <TabletStatusButton
              onClick={openRestoreDialog}
              icon="return"
              text={t('header.restore')}
            />
          )}
          <ReportButton
            onClick={openReportDialog}
            leftIcon={'danger'}
            sizeInPx={ICON_SIZES.SMALL}
            text={{
              color: 'purple',
              text: t('header.report'),
              variant: 'link',
            }}
          />
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
