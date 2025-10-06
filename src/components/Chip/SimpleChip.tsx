import styled from 'styled-components';
import React from 'react';
import { palette } from '../constants';
import Text from '../Text';

/**
 * Creates a non-selectable chip
 */

type Props = {
  text: string;
};

const SimpleChip: React.FC<Props> = ({ text }) => {
  return (
    <StyledSimpleChip key={text} value={text}>
      <Text variant="chip">{text}</Text>
    </StyledSimpleChip>
  );
};

const StyledSimpleChip = styled.button`
  flex: 0 0 auto;
  height: 2rem;
  padding: 0.5rem 1rem;
  line-height: 1rem;
  appearance: none;
  background-color: ${palette.blueLight};
  border: none;
  border-radius: 1.75rem;
`;

export default SimpleChip;
