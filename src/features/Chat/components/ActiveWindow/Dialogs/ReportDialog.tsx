import styled from 'styled-components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { selectUserId } from '@/features/Authentication/userSlice';
import { useAppSelector } from '@/store';
import { useReportMentorMutation } from '@/features/Chat/chatPageApi';

import { DEFAULT_ICON_SIZE, DIALOG_WIDTH } from '@/components/constants';
import { IconButton, TextButton } from '@/components/Buttons';
import {
  isContactInfoTooLong,
  isReportReasonTooLong,
} from '@/features/Chat/validators';
import LabeledInput from '@/components/LabeledInput';
import { palette } from '@/components/constants';
import ReportSuccessDialog from './ReportSuccessDialog';
import Text from '@/components/Text';

type Props = {
  buddyId: string;
  close: () => void;
};

const ReportDialog = ({ buddyId, close }: Props) => {
  const { t } = useTranslation('chat');

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
      setIsReported(true);
    } catch (err) {
      console.error(err);
    }
  };

  const [isReported, setIsReported] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  const isSavingDisabled =
    reportReason.length < 1 ||
    isReportReasonTooLong(reportReason) ||
    isContactInfoTooLong(contactInfo);

  return (
    <>
      <Overlay />
      {isReported ? (
        <ReportSuccessDialog close={close} />
      ) : (
        <Container>
          <CloseButton
            variant="closeWithBackground"
            sizeInPx={DEFAULT_ICON_SIZE.MEDIUM}
            onClick={close}
          />
          <Title color="white" variant="h1">
            {t('dialog.report.title')}
          </Title>
          <Content>
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
            <ButtonContainerWithMargin>
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
            </ButtonContainerWithMargin>
          </Content>
        </Container>
      )}
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

const Container = styled.div`
  align-items: center;
  background-color: ${palette.white};
  border-radius: 20px;
  border-top: 140px solid ${palette.purple};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: fit-content;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: ${DIALOG_WIDTH};
  z-index: 200;
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  right: 17px;
  top: -123px;
`;

const Title = styled(Text)`
  position: absolute;
  top: -100px;
`;

const Content = styled.div`
  padding: 2rem 5rem;
`;

const Paragraph = styled(Text)`
  margin-bottom: 1rem;
  margin-top: 0;
`;

const ButtonContainerWithMargin = styled.div`
  display: flex;
  gap: 3rem;
  margin-top: 2.5rem;
`;

const ActionButton = styled(TextButton)`
  flex-grow: 1;
`;

export default ReportDialog;
