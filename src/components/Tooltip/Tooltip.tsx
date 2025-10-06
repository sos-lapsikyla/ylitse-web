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
  position: relative;
  display: inline-block;
`;

const Icon = styled.img`
  :hover {
    cursor: pointer;
  }
`;

const Info = styled(Text)`
  position: absolute;
  top: -102px;
  right: -130px;
  z-index: 1;
  display: none;
  width: 268px;
  padding: 0.5rem 1rem;
  white-space: wrap;
  background-color: ${palette.orange};
  border-radius: 10px;

  ::after {
    position: absolute;
    top: 100%;
    left: 50%;
    content: '';
    border-color: ${palette.orange} transparent transparent transparent;
    border-style: solid;
    border-width: 0.5rem;
  }

  ${Container}:hover & {
    display: block;
  }
`;
