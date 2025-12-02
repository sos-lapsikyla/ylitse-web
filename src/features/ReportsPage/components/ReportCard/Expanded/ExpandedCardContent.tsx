import styled from 'styled-components';
import Text from '@/components/Text';
import { useTranslation } from 'react-i18next';
import { Success } from '@/components/Icons/Success';
import { Warning } from '@/components/Icons/Warning';
import { Report } from '@/features/ReportsPage/models';
import { Button, TextButton } from '@/components/Buttons';
import { useUpdateReportMutation } from '@/features/ReportsPage/reportsApi';
import LabeledInput from '@/components/LabeledInput';
import { useState } from 'react';

type Props = {
  report: Report;
  onDismiss: () => void;
};

const ExpandedCardContent: React.FC<Props> = ({ report, onDismiss }) => {
  const { t } = useTranslation('reports');
  const isContactFieldEmpty = report.contactField === '';
  const [updateReport] = useUpdateReportMutation();
  type ReportStatus = 'handled' | 'received';
  const [comment, setComment] = useState('');
  const [isCommentContainerOpen, setIsCommentContainerOpen] = useState(false);
  const [nextStatus, setNextStatus] = useState<ReportStatus | null>(null);

  const changeStatus = async (nextStatus: ReportStatus) => {
    try {
      await updateReport({
        id: report.id,
        body: {
          status: nextStatus,
          comment: comment,
        },
      }).unwrap();
      onDismiss();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <TextGroup>
        <Text variant="boldBaloo">{t('reportCard.state.title')}</Text>
        <IconTextRow>
          {report.status === 'handled' ? (
            <Success color="green" sizeInPx={20} variant="no-ellipse" />
          ) : (
            <Warning color="redDark" sizeInPx={24} variant="filled" />
          )}

          <ReportInfoText
            variant="boldBaloo"
            color={report.status === 'handled' ? 'green' : 'redDark'}
          >
            {report.status === 'handled'
              ? t('reportCard.state.handled')
              : t('reportCard.state.received')}
          </ReportInfoText>

          <Button
            sizeInPx={18}
            onClick={() => {
              setNextStatus(
                report.status === 'handled' ? 'received' : 'handled',
              );
              setIsCommentContainerOpen(true);
            }}
            text={{
              color: report.status === 'handled' ? 'purpleDark' : 'purple',
              text:
                report.status === 'handled'
                  ? t('reportCard.state.markAsReceived')
                  : t('reportCard.state.markAsHandled'),
              variant: 'underLinedinlineLink',
            }}
          />
        </IconTextRow>
      </TextGroup>
      {isCommentContainerOpen && (
        <Container>
          <LabeledInput
            label={t('reportCard.state.addComment')}
            onChange={value => setComment(value)}
            value={comment}
          />
          <ButtonContainer>
            <TextButton
              onClick={() => setIsCommentContainerOpen(false)}
              variant="outlinePurple"
            >
              {t('reportCard.state.close')}
            </TextButton>
            <TextButton
              variant="dark"
              onClick={() => nextStatus && void changeStatus(nextStatus)}
            >
              {t('reportCard.state.save')}
            </TextButton>
          </ButtonContainer>
        </Container>
      )}
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
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 2rem 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: space-between;
`;

const ReportInfoText = styled(Text)`
  margin: 0;
  padding-right: 2rem;
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

export default ExpandedCardContent;
