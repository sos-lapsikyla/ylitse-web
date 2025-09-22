import styled from 'styled-components';
import { palette } from '@/components/constants';
import Text from '@/components/Text';

export const Section = styled.div`
  border-bottom: 1px solid ${palette.blueDark};
  display: flex;
  flex-direction: column;
  padding: 1rem 0;

  &:last-child {
    border-bottom: 0;
  }
`;

export const ButtonRow = styled.div`
  box-sizing: border-box;
  display: flex;
  gap: 2rem;
  justify-content: center;
  width: 100%;
`;

export const Value = styled(Text)`
  margin: 0.5rem 0 0 0;
`;
