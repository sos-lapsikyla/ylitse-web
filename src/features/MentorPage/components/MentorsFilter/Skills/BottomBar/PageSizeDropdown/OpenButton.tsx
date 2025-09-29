import { palette } from '@/components/constants';
import styled, { css } from 'styled-components';
import Text from '@/components/Text';
import { Chevron } from '@/components/Icons/Chevron';
import { Button } from './PageOption';

type Props = {
  isComponentVisible: boolean;
  onClick: (next: boolean) => void;
  selected: number;
};

export const OpenButton = ({
  isComponentVisible,
  onClick,
  selected,
}: Props) => (
  <SelectButton
    onClick={() => onClick(!isComponentVisible)}
    $isExpanded={isComponentVisible}
  >
    <Text variant="boldBaloo" color="purple">
      {selected}
    </Text>
    <Chevron
      variant={isComponentVisible ? 'up' : 'down'}
      color="purple"
      isLarge
    />
  </SelectButton>
);

const SelectButton = styled(Button)<{ $isExpanded: boolean }>`
  align-items: center;
  border: 2px solid transparent;
  border-bottom: 2px;
  border-radius: 8px;
  box-sizing: border-box;
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  width: 100%;

  ${({ $isExpanded }) =>
    $isExpanded
      ? css`
          border-bottom-color: transparent;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
          border-color: ${palette.purple};
        `
      : css`
          &:hover {
            background-color: ${palette.white};
          }
        `}
`;
