import styled from 'styled-components';

import { palette } from '../constants';
import Text from '../Text';
import TooltipIcon from '@/static/icons/tooltip.svg';

type Props = {
  text: string;
};

export const Tooltip = ({ text }: Props) => {
  return (
    <Container>
      <Icon src={TooltipIcon} />
      <Info>{text}</Info>
    </Container>
  );
};

const Container = styled.div`
  display: inline-block;
  position: relative;
`;

const Icon = styled.img`
  :hover {
    cursor: pointer;
  }
`;

const Info = styled(Text)`
  background-color: ${palette.orange};
  border-radius: 10px;
  display: none;
  padding: 0.5rem 1rem;
  position: absolute;
  right: -130px;
  top: -102px;
  white-space: wrap;
  width: 268px;
  z-index: 10;

  :after {
    border-color: ${palette.orange} transparent transparent transparent;
    border-style: solid;
    border-width: 0.5rem;
    content: '';
    left: 50%;
    position: absolute;
    top: 100%;
  }

  ${Container}:hover & {
    display: block;
  }
`;
