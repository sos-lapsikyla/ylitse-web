import styled, { css } from 'styled-components';
import ReportCard from '../ReportCard';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import { Report } from '../../models';

type Props = {
  reports: Report[];
  setVisibleCard: (report: Report) => void;
};

const ReportList: React.FC<Props> = ({ reports, setVisibleCard }) => {
  const { isMobile } = useGetLayoutMode();

  const sortedReports = [...reports].sort((a, b) => {
    const aIsReceived = a.status === 'received' ? 0 : 1;
    const bIsReceived = b.status === 'received' ? 0 : 1;
    return aIsReceived - bIsReceived;
  });

  return (
    <ListContainer $isMobile={isMobile}>
      {sortedReports.map((report, index) => (
        <ReportCard
          key={report.id}
          report={report}
          reportNumber={index + 1}
          setVisibleCard={setVisibleCard}
        />
      ))}
    </ListContainer>
  );
};

const ListContainer = styled.div<{ $isMobile: boolean }>`
  display: grid;
  gap: clamp(4rem, 2vw, 1.5rem);
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  justify-items: center;
  margin-top: 3rem;
  width: 100%;

  ${({ $isMobile }) =>
    $isMobile &&
    css`
      align-items: center;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      max-width: 100%;
      padding: 0;
      width: 100%;
    `}
`;
export default ReportList;
