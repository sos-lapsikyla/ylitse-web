import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { selectIsMentee } from '@/features/Authentication/userSlice';
import { useAppSelector } from '@/store';

import { Button, StatusButton } from '@/components/Buttons';
import { ICON_SIZES } from '@/components/constants';

import type { ChatBuddy } from '@/features/Chat/mappers';

type DialogVariant = 'archive' | 'block' | 'restore';

type Props = {
  chat: ChatBuddy;
  confirmStatusChange: (variant: DialogVariant) => void;
  openReportModal: () => void;
};

const DesktopButtons = ({
  chat,
  confirmStatusChange,
  openReportModal,
}: Props) => {
  const { t } = useTranslation('chat');
  const isMentee = useAppSelector(selectIsMentee);

  const openArchiveDialog = () => confirmStatusChange('archive');
  const openBlockDialog = () => confirmStatusChange('block');
  const openRestoreDialog = () => confirmStatusChange('restore');

  return (
    <Container>
      {chat.status === 'ok' ? (
        <>
          <StatusButton
            onClick={openArchiveDialog}
            icon="archive"
            text={t('header.archive')}
          />
          <StatusButton
            onClick={openBlockDialog}
            icon="block"
            text={t('header.block')}
          />
        </>
      ) : (
        <StatusButton
          onClick={openRestoreDialog}
          icon="return"
          text={t('header.restore')}
        />
      )}
      {isMentee && (
        <Button
          onClick={openReportModal}
          leftIcon={'danger'}
          sizeInPx={ICON_SIZES.SMALL}
          text={{
            color: 'purple',
            text: t('header.report'),
            variant: 'link',
          }}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  align-items: center;
  display: flex;
  gap: 30px;
`;

export default DesktopButtons;
