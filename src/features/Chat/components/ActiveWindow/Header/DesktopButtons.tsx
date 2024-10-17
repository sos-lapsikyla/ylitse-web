import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Button, StatusButton } from '@/components/Buttons';
import { DEFAULT_ICON_SIZE } from '@/components/constants';

import type { ChatBuddy } from '@/features/Chat/mappers';
import type { DialogVariant } from '../Dialogs';
import { useAppSelector } from '@/store';
import { selectIsMentee } from '@/features/Authentication/userSlice';

type Props = {
  chat: ChatBuddy;
  openDialog: (variant: DialogVariant) => void;
};

const DesktopButtons = ({ chat, openDialog }: Props) => {
  const { t } = useTranslation('chat');
  const isMentee = useAppSelector(selectIsMentee);

  const openArchiveDialog = () => openDialog('archive');
  const openBlockDialog = () => openDialog('block');
  const openRestoreDialog = () => openDialog('restore');
  const openReportDialog = () => openDialog('report');

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
          onClick={openReportDialog}
          leftIcon={'danger'}
          sizeInPx={DEFAULT_ICON_SIZE.SMALL}
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
