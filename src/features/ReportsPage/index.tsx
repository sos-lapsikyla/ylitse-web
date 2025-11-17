import { useState } from 'react';
import styled, { css } from 'styled-components';
import { OUTER_VERTICAL_MARGIN, palette } from '@/components/constants';

import { useTranslation } from 'react-i18next';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import { useGetReportsQuery } from './reportsApi';
import { useAppSelector } from '@/store';
import { selectAllReports } from './selectors';

import Text from '@/components/Text';
import Spinner from '@/components/Spinner';
import PageWithTransition from '@/components/PageWithTransition';
import ReportList from './components/List';
import { Report } from './models';
import ExpandedReportCard from './components/ReportCard/Expanded';

const ReportsPage = () => {
  const { t } = useTranslation('reports');
  const { isMobile } = useGetLayoutMode();
  const { isLoading } = useGetReportsQuery();
  const reports = useAppSelector(selectAllReports());
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const PageContent = isLoading ? (
    <Spinner variant="large" />
  ) : (
    <>
      <PageHeader $isMobile={isMobile}>
        <TitleWrapper $isMobile={isMobile}>
          <Text variant="h1">{t('title')}</Text>
        </TitleWrapper>
      </PageHeader>
      <PageContainer>
        {selectedReport && (
          <ExpandedReportCard
            report={selectedReport}
            reportNumber={0}
            onDismiss={() => setSelectedReport(null)}
          />
        )}
        <ReportList
          reports={reports}
          setVisibleCard={setSelectedReport}
        ></ReportList>
      </PageContainer>
    </>
  );

  return (
    <PageWithTransition>
      <Container $isMobile={isMobile}>{PageContent}</Container>
    </PageWithTransition>
  );
};

const Container = styled.div<{ $isMobile: boolean }>`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: ${OUTER_VERTICAL_MARGIN} auto;
  max-width: 70rem;
  ${({ $isMobile }) =>
    $isMobile
      ? css`
          width: 100%;
        `
      : css`
          width: 90%;
        `}
`;

const PageHeader = styled.div<{ $isMobile: boolean }>`
  display: flex;
  margin-bottom: -1rem;
  max-width: 70rem;
  position: relative;
  width: 100%;

  ${({ $isMobile }) =>
    $isMobile
      ? css`
          background-color: ${palette.white};
          flex-direction: column;
          gap: 2rem;
          margin-bottom: -3rem;
          margin-top: -3rem;
          padding: 2rem 6rem;
        `
      : css`
          align-items: center;
          background-color: ${palette.blue2};
          border-radius: 10px;
          height: 80px;
          justify-content: center;
          max-height: 80px;
        `}
`;
const TitleWrapper = styled.div<{ $isMobile: boolean }>`
  ${({ $isMobile }) =>
    !$isMobile
      ? css`
          left: 50%;
          position: absolute;
          transform: translateX(-50%);
        `
      : css`
          padding-left: 2rem;
        `};
`;

const PageContainer = styled.div`
  padding-top: 1rem;
  width: 100%;
`;

export default ReportsPage;
