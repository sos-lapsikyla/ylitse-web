import { Card, CardHeader } from '@/components/Card';
import { palette } from '@/components/constants';
import styled from 'styled-components';
import Text from '@/components/Text';
import { useTranslation } from 'react-i18next';
import { Report } from '../../models';
import { Warning } from '@/components/Icons/Warning';
import { Success } from '@/components/Icons/Success';
import { ExpandButton } from '@/components/Buttons';

type Props = {
  report: Report;
  reportNumber: number;
  setVisibleCard: (report: Report, reportNumber: number) => void;
};

const ReportCard: React.FC<Props> = ({
  report,
  reportNumber,
  setVisibleCard,
}) => {
  const { t } = useTranslation('reports');
  const isContactFieldEmpty = report.contactField === '';
  return (
    <Card headerSize="small">
      <CardHeader color={palette.blue2} size="small">
        <Text variant="h3" color="blueDark">
          {t('reportCard.title', { number: reportNumber })}
        </Text>
      </CardHeader>
      <TextGroup>
        <Text variant="boldBaloo">{t('reportCard.state.title')}</Text>
        {report.status === 'handled' && (
          <IconTextRow>
            <Success color="green" sizeInPx={20} variant="no-ellipse"></Success>
            <ReportInfoText variant="boldBaloo" color="green">
              {t('reportCard.state.handled')}
            </ReportInfoText>
          </IconTextRow>
        )}
        {report.status === 'received' && (
          <IconTextRow>
            <Warning color="redDark" sizeInPx={24} variant="filled"></Warning>
            <ReportInfoText variant="boldBaloo" color="redDark">
              {t('reportCard.state.received')}
            </ReportInfoText>
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
        <TrucatedReportInfoText variant="p">
          {report.reportReason}
        </TrucatedReportInfoText>
      </TextGroup>
      <TextGroup>
        <Text variant="boldBaloo">{t('reportCard.contact')}</Text>
        <ReportInfoText variant="p">
          {isContactFieldEmpty
            ? t('reportCard.emptyContactField')
            : report.contactField}
        </ReportInfoText>
      </TextGroup>
      <ExpandButton
        title={t('reportCard.open')}
        onClick={() => setVisibleCard(report, reportNumber)}
      />
    </Card>
  );
};

const ReportInfoText = styled(Text)`
  margin: 0;
`;

const TrucatedReportInfoText = styled(Text)`
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  margin: 0;
  max-height: 5rem;
  overflow: hidden;
  position: relative;
  text-overflow: ellipsis;
  white-space: break-spaces;
  width: 100%;
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

export default ReportCard;
