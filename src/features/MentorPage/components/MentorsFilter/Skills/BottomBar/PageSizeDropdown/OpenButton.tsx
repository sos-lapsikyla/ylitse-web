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
  box-sizing: border-box;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
  padding: 0.5rem;
  border: 2px solid transparent;
  border-bottom: 2px;
  border-radius: 8px;

  ${({ $isExpanded }) =>
    $isExpanded
      ? css`
          border-color: ${palette.purple};
          border-bottom-color: transparent;
          border-bottom-right-radius: 0;
          border-bottom-left-radius: 0;
        `
      : css`
          &:hover {
            background-color: ${palette.white};
          }
        `}
`;
