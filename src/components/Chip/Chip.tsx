import React from 'react';
import styled, { css } from 'styled-components';
import Text from '../Text';
import { animations, palette } from '../constants';
import CloseIcon from '@/static/icons/close-with-background.svg';

type Props = {
  text: string;
  isSelected?: boolean;
  shouldShake?: boolean;
  onToggle: (text: string) => void;
};

const Chip: React.FC<Props> = ({
  text,
  isSelected = true,
  shouldShake = false,
  onToggle,
}) => {
  return (
    <StyledChip
      key={text}
      value={text}
      onClick={() => onToggle(text)}
      $isSelected={isSelected}
      $shouldShake={shouldShake}
      aria-pressed={isSelected}
    >
      <Text variant="chip" color={isSelected ? 'white' : 'blueDark'}>
        {text}
      </Text>

      {isSelected && <Close />}
    </StyledChip>
  );
};

const StyledChip = styled.button<{
  $isSelected: boolean;
  $shouldShake: boolean;
}>`
  display: flex;
  flex: 0 0 auto;
  gap: 0.5rem;
  align-items: center;
  height: 2.75rem;
  padding: 0 1rem;
  appearance: none;
  cursor: pointer;
  border: none;
  border-radius: 2rem;
  box-shadow: 0 2px 8px 0 rgb(118 117 117 / 20%);

  ${({ $isSelected }) =>
    $isSelected
      ? css`
          background-color: ${palette.purple};

          &:hover {
            background-color: ${palette.purple};
          }
        `
      : css`
          background-color: ${palette.purplePale};

          &:hover {
            background-color: ${palette.purpleHover};
          }
        `}

  ${({ $shouldShake }) =>
    $shouldShake &&
    css`
      transform: translate3d(0, 0, 0);
      perspective: 1000px;
      backface-visibility: hidden;

      ${animations.shake}
    `}

  &:hover {
    opacity: 0.7;
  }
`;

const Close = styled.span`
  z-index: 10;
  width: 20px;
  height: 20px;
  cursor: pointer;
  background-color: transparent;
  background-image: url(${CloseIcon});
  background-repeat: no-repeat;
  background-size: contain;
`;

export default Chip;
