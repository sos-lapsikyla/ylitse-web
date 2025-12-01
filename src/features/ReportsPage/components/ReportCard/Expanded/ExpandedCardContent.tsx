import styled from 'styled-components';
import Text from '@/components/Text';
import { useTranslation } from 'react-i18next';
import { Success } from '@/components/Icons/Success';
import { Warning } from '@/components/Icons/Warning';
import { Report } from '@/features/ReportsPage/models';
import { Button } from '@/components/Buttons';
import { useUpdateReportMutation } from '@/features/ReportsPage/reportsApi';

type Props = {
  report: Report;
  onDismiss: () => void;
};

const ExpandedCardContent: React.FC<Props> = ({ report, onDismiss }) => {
  const { t } = useTranslation('reports');
  const isContactFieldEmpty = report.contactField === '';
  const [updateReport] = useUpdateReportMutation();
  type reportStatus = 'handled' | 'received';

  const changeState = async (nextStatus: reportStatus) => {
    try {
      await updateReport({
        id: report.id,
        body: {
          status: nextStatus,
          comment: '',
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
        {report.status === 'handled' && (
          <IconTextRow>
            <Success color="green" sizeInPx={20} variant="no-ellipse"></Success>
            <ReportInfoText variant="boldBaloo" color="green">
              {t('reportCard.state.handled')}
            </ReportInfoText>
            <Button
              sizeInPx={18}
              onClick={() => void changeState('received')}
              text={{
                color: 'purpleDark',
                text: t('reportCard.state.markAsReceived'),
                variant: 'underLinedinlineLink',
              }}
            />
          </IconTextRow>
        )}
        {report.status === 'received' && (
          <IconTextRow>
            <Warning color="redDark" sizeInPx={24} variant="filled"></Warning>
            <ReportInfoText variant="boldBaloo" color="redDark">
              {t('reportCard.state.received')}
            </ReportInfoText>
            <Button
              sizeInPx={18}
              onClick={() => void changeState('handled')}
              text={{
                color: 'purple',
                text: t('reportCard.state.markAsHandled'),
                variant: 'underLinedinlineLink',
              }}
            />
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
    </>
  );
};

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
