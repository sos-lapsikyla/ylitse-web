import styled, { css } from 'styled-components';
import { palette } from '../constants';
import Text from '../Text';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

type Props = {
  date: string;
};

const ChatDateDivider: React.FC<Props> = ({ date }) => {
  const { isTablet } = useGetLayoutMode();

  return <DateDivider $isTablet={isTablet}>{date}</DateDivider>;
};

const DateDivider = styled(Text)<{ $isTablet: boolean }>`
  position: relative;
  text-align: center;
  ${({ $isTablet }) =>
    !$isTablet &&
    css`
      margin-left: 40px;
      margin-right: 40px;
    `}

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    width: ${({ $isTablet }) => ($isTablet ? '30%' : '40%')};
    height: 1px;
    background-color: ${palette.purple}};
  }

  &:before {
    left: 0;
  }

  &:after {
    right: 0;
  }
`;

export default ChatDateDivider;
