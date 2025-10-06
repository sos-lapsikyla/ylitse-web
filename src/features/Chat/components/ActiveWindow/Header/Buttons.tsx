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
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

type DialogVariant = 'archive' | 'block' | 'restore' | 'unblock';

type Props = {
  chat: ChatBuddy;
  confirmStatusChange: (variant: DialogVariant) => void;
  openReportModal: () => void;
};

const Buttons = ({ chat, confirmStatusChange, openReportModal }: Props) => {
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

  const { isTablet } = useGetLayoutMode();

  const chatStatusButtonMap: Record<
    string,
    {
      action: DialogVariant;
      icon: 'archive' | 'block' | 'return';
      text: string;
    }[]
  > = {
    ok: [
      { action: 'archive', icon: 'archive', text: t('header.archive') },
      { action: 'block', icon: 'block', text: t('header.block') },
    ],
    archived: [
      { action: 'restore', icon: 'return', text: t('header.restore') },
    ],
    banned: [{ action: 'unblock', icon: 'return', text: t('header.unblock') }],
  };

  return (
    <Container>
      {isTablet ? (
        <>
          <IconButton
            variant="menuLines"
            sizeInPx={ICON_SIZES.LARGE}
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <Dropdown>
              {chatStatusButtonMap[chat.status]?.map(
                ({ action, icon, text }) => (
                  <TabletStatusButton
                    key={action}
                    onClick={() => confirmAction(action)}
                    icon={icon}
                    text={text}
                  />
                ),
              )}
              {isMentee && (
                <ReportButton
                  onClick={showReportModal}
                  leftIcon="danger"
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
        </>
      ) : (
        <>
          {chatStatusButtonMap[chat.status]?.map(({ action, icon, text }) => (
            <StatusButton
              key={action}
              onClick={() => confirmStatusChange(action)}
              icon={icon}
              text={text}
            />
          ))}
          {isMentee && (
            <Button
              onClick={openReportModal}
              leftIcon="danger"
              sizeInPx={ICON_SIZES.SMALL}
              text={{
                color: 'purple',
                text: t('header.report'),
                variant: 'link',
              }}
            />
          )}
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
`;

const Dropdown = styled.div`
  position: absolute;
  top: ${HIGH_ROW_HEIGHT};
  right: 40px;
  z-index: 5;
  background-color: ${palette.white};
  border-radius: 0 0 4px 4px;
  box-shadow: 0 4px 4px rgb(0 0 0 / 15%);
`;

const TabletStatusButton = styled(StatusButton)`
  padding: 10px 40px 0;
`;

const ReportButton = styled(Button)`
  padding: 10px 40px;
`;

export default Buttons;
