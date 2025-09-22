import Text from '@/components/Text';
import { palette } from '@/components/constants';
import styled from 'styled-components';

type Props = {
  size: number;
  onClick: (size: number) => void;
  isSelected: boolean;
};

export const PageOption = ({ onClick, isSelected, size }: Props) => (
  <Button
    onClick={() => onClick(size)}
    disabled={isSelected}
    $isSelected={isSelected}
  >
    <ButtonText color={isSelected ? 'greyOverlay' : 'blueDark'}>
      {size}
    </ButtonText>
  </Button>
);

export const Button = styled.button<{ $isSelected?: boolean }>`
  align-items: center;
  background: transparent;
  border: 0;
  border-bottom: 2px solid ${palette.greyMid};
  box-sizing: border-box;
  cursor: ${({ $isSelected }) => ($isSelected ? 'auto' : 'pointer')};
  display: flex;
  padding: 0 0.5rem;
  width: 100%;

  &:last-child {
    border-bottom: 0;
  }

  &:hover {
    background-color: ${({ $isSelected }) =>
      $isSelected ? 'inherit' : palette.blueLight};
  }
`;

const ButtonText = styled(Text)`
  line-height: 1rem;
  margin: 0.5rem 0;
`;
