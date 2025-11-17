import { Modal, ModalBackground } from '@/components/Modal';
import { Report } from '@/features/ReportsPage/models';
import Text from '@/components/Text';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Success } from '@/components/Icons/Success';
import { Warning } from '@/components/Icons/Warning';
import { TextButton } from '@/components/Buttons';

type Props = {
  report: Report;
  reportNumber: number;
  onDismiss: () => void;
};

const ExpandedReportCard: React.FC<Props> = ({
  report,
  reportNumber,
  onDismiss,
}) => {
  const { t } = useTranslation('reports');
  const isContactFieldEmpty = report.contactField === '';

  return (
    <ModalBackground>
      <Modal
        onDismiss={() => onDismiss()}
        title={t('reportCard.title', { number: reportNumber })}
      >
        <Container>
          <TextGroup>
            <Text variant="boldBaloo">{t('reportCard.state.title')}</Text>
            {report.status === 'handled' && (
              <IconTextRow>
                <Success
                  color="green"
                  sizeInPx={20}
                  variant="no-ellipse"
                ></Success>
                <ReportInfoText variant="boldBaloo" color="green">
                  {t('reportCard.state.handled')}
                </ReportInfoText>
              </IconTextRow>
            )}
            {report.status === 'received' && (
              <IconTextRow>
                <Warning
                  color="redDark"
                  sizeInPx={24}
                  variant="filled"
                ></Warning>
                <ReportInfoText variant="boldBaloo" color="redDark">
                  {t('reportCard.state.received')}
                </ReportInfoText>
                <Text variant="inlineLink">
                  {t('reportCard.state.markAsHandled')}
                </Text>
              </IconTextRow>
            )}
          </TextGroup>
          <TextGroup>
            <Text variant="boldBaloo">{t('reportCard.sent')}</Text>
            <ReportInfoText variant="p">
              {' '}
              {new Date(report.created).toLocaleString('fi-EU', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </ReportInfoText>
          </TextGroup>
          <TextGroup>
            <Text variant="boldBaloo">{t('reportCard.reason')}</Text>
            <ReportInfoText variant="p">{report.reportReason}</ReportInfoText>
          </TextGroup>
          <TextGroup>
            <Text variant="boldBaloo">{t('reportCard.contact')}</Text>
            <ReportInfoText variant="p">
              {isContactFieldEmpty
                ? t('reportCard.emptyContactField')
                : report.contactField}
            </ReportInfoText>
          </TextGroup>
          <ButtonContainer>
            <TextButton size="normal" onClick={onDismiss} variant="light">
              {t('reportCard.cancel')}
            </TextButton>
            <TextButton
              size="normal"
              onClick={() => console.log('todo')}
              variant="disabled"
            >
              {t('reportCard.openConversation')}
            </TextButton>
          </ButtonContainer>
        </Container>
      </Modal>
    </ModalBackground>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: space-between;
  padding: 2rem 0 1.75rem 0;
`;

const Container = styled.div`
  padding-top: 2rem;
`;

const ReportInfoText = styled(Text)`
  margin: 0;
`;

const IconTextRow = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

export default ExpandedReportCard;
