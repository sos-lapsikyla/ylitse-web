import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import Text from '../Text';
import { animations, palette } from '../constants';
import CloseIcon from '@/static/icons/close-with-background.svg';

type Props = {
  text: string;
  isSelected?: boolean;
  shouldShake?: boolean;
  onToggle: (text: string) => void;
  children?: ReactNode;
};

const Chip: React.FC<Props> = ({
  text,
  isSelected = true,
  shouldShake = false,
  onToggle,
  children,
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
      {children}
      {isSelected && <Close />}
    </StyledChip>
  );
};

const StyledChip = styled.button<{
  $isSelected: boolean;
  $shouldShake: boolean;
}>`
  align-items: center;
  appearance: none;
  border: none;
  border-radius: 2rem;
  box-shadow: 0 2px 6px 0 rgba(129, 129, 129, 0.2);
  cursor: pointer;
  display: flex;
  flex: 0 0 auto;
  gap: 0.5rem;
  height: 2.5rem;
  padding: 0 1rem;

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
      animation: ${animations.shake}
      backface-visibility: hidden;
      perspective: 1000px;
      transform: translate3d(0, 0, 0);
    `}

  &:hover {
    opacity: 0.7;
  }
`;

const Close = styled.span`
  background-color: transparent;
  background-image: url(${CloseIcon});
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
  height: 20px;
  width: 20px;
  z-index: 10;
`;

export default Chip;
