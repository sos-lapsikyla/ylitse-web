import styled from 'styled-components';
import { palette } from '@/components/constants';
import { ROW_HEIGHT } from '@/features/Chat/constants';

export const Row = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: ${ROW_HEIGHT};
  min-height: ${ROW_HEIGHT};
  padding-left: 40px;
  border-bottom: 1px solid ${palette.greyLight};
`;
