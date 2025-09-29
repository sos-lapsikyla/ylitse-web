import styled from 'styled-components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { selectUserId } from '@/features/Authentication/selectors';
import { useAppSelector } from '@/store';
import { useConfirm } from '@/features/Confirmation/useConfirm';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import { useReportMentorMutation } from '@/features/Chat/chatPageApi';

import { DIALOG_WIDTH, ICON_SIZES } from '@/components/constants';
import { IconButton, TextButton } from '@/components/Buttons';
import {
  isContactInfoTooLong,
  isReportReasonTooLong,
} from '@/features/Chat/validators';
import LabeledInput from '@/components/LabeledInput';
import { palette } from '@/components/constants';
import Text from '@/components/Text';

type Props = {
  buddyId: string;
  close: () => void;
};

const ReportModal = ({ buddyId, close }: Props) => {
  const { t } = useTranslation('chat');
  const { isMobile } = useGetLayoutMode();
  const { getConfirmation } = useConfirm();
  const userId = useAppSelector(selectUserId);
  const [reportMentor] = useReportMentorMutation();

  const sendReportRequest = async () => {
    try {
      if (!userId) return;
      await reportMentor({
        buddyId,
        contactInfo,
        reportReason,
        userId,
      }).unwrap();
      close();
      await getConfirmation({
        borderColor: palette.blue,
        closeText: t(`dialog.report.success.confirm`),
        description: t(`dialog.report.success.description`),
        isConfirmRequired: false,
        title: t(`dialog.report.success.title`),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const [reportReason, setReportReason] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  const isSavingDisabled =
    reportReason.length < 1 ||
    isReportReasonTooLong(reportReason) ||
    isContactInfoTooLong(contactInfo);

  return (
    <>
      <Overlay />
      <Container $isMobile={isMobile}>
        <Header>
          <Text color="white" variant="h1">
            {t('dialog.report.title')}
          </Text>
          <CloseButton
            variant="closeWithBackground"
            sizeInPx={ICON_SIZES.MEDIUM}
            onClick={close}
          />
        </Header>
        <Content $isMobile={isMobile}>
          <Paragraph>{t('dialog.report.description1')}</Paragraph>
          <Paragraph>{t('dialog.report.description2')}</Paragraph>
          <Paragraph>{t('dialog.report.description3')}</Paragraph>
          <LabeledInput
            error={
              isReportReasonTooLong(reportReason)
                ? t('dialog.report.input.tooLongError')
                : null
            }
            label={t('dialog.report.input.reason')}
            onChange={setReportReason}
            value={reportReason}
          />
          <LabeledInput
            error={
              isContactInfoTooLong(contactInfo)
                ? t('dialog.report.input.tooLongError')
                : null
            }
            label={t('dialog.report.input.contactInfo')}
            onChange={setContactInfo}
            value={contactInfo}
          />
          <Buttons>
            <ActionButton onClick={close} variant="light">
              {t('dialog.cancel')}
            </ActionButton>
            <ActionButton
              isDisabled={isSavingDisabled}
              onClick={sendReportRequest}
              variant={isSavingDisabled ? 'disabled' : 'dark'}
            >
              {t('dialog.report.confirm')}
            </ActionButton>
          </Buttons>
        </Content>
      </Container>
    </>
  );
};

const Overlay = styled.div`
  background: var(--greyscale-overlay, rgba(57, 57, 57, 0.75));
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 100;
`;

const Container = styled.div<{ $isMobile: boolean }>`
  background-color: ${palette.white};
  border-radius: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: fit-content;
  left: 50%;
  max-height: 80vh;
  overflow-y: auto;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: ${({ $isMobile }) => ($isMobile ? '90%' : DIALOG_WIDTH)};
  z-index: 200;
`;

const Header = styled.div`
  align-items: center;
  background-color: ${palette.purple};
  display: flex;
  justify-content: center;
  max-height: 140px;
  padding: 2rem;
  position: relative;
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  right: 1rem;
  top: 1rem;
`;

const Content = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  padding: ${({ $isMobile }) => ($isMobile ? '2rem' : '2rem 5rem')};
`;

const Paragraph = styled(Text)`
  margin-bottom: 1rem;
  margin-top: 0;
`;

const Buttons = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
`;

const ActionButton = styled(TextButton)`
  flex-grow: 1;
`;

export default ReportModal;
