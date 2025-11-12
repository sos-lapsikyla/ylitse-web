import { Card, Header } from '@/components/Card';
import { palette } from '@/components/constants';
import styled from 'styled-components';
import Text from '@/components/Text';
import { useTranslation } from 'react-i18next';
import { Report } from '../../models';

type Props = {
  report: Report;
};

const ReportCard: React.FC<Props> = ({ report }) => {
  const { t } = useTranslation('reports');
  return (
    <Card headerSize="small">
      <Header color={palette.blue2} size="small">
        <Text variant="h3" color="blueDark">
          {t('reportCard.title')}
        </Text>
      </Header>
      <TextGroup>
        <Text variant="boldBaloo">{t('reportCard.state.title')}</Text>
        <ReportInfoText variant="p">{report.status}</ReportInfoText>
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
        <ReportInfoText variant="p">{report.contactField}</ReportInfoText>
      </TextGroup>
    </Card>
  );
};

const ReportInfoText = styled(Text)`
  margin: 0;
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

export default ReportCard;
