import styled, { css } from 'styled-components';
import ReportCard from '../ReportCard';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import { Report } from '../../models';

type Props = {
  reports: Report[];
};

const ReportList: React.FC<Props> = ({ reports }) => {
  const { isMobile } = useGetLayoutMode();

  return (
    <ListContainer $isMobile={isMobile}>
      <ReportCard report={reports[0]}></ReportCard>
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
      padding: 0 1rem;
      width: 100%;
    `}
`;
export default ReportList;
