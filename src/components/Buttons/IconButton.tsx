import { ComponentPropsWithoutRef, ElementType } from 'react';
import styled, { css } from 'styled-components';

import { ButtonIcon, iconVariants } from './variants';

export type ButtonProps<T extends ElementType> = {
  isDisabled?: boolean;
  sizeInPx: number;
  variant: ButtonIcon;
} & ComponentPropsWithoutRef<T>;

const IconButton = <T extends ElementType = 'button'>({
  isDisabled = false,
  onClick,
  sizeInPx,
  variant,
  ...rest
}: ButtonProps<T>): JSX.Element => {
  return (
    <Container onClick={onClick}>
      <StyledIconButton
        aria-label={variant}
        disabled={isDisabled}
        size={sizeInPx}
        variant={variant}
        {...rest}
      />
    </Container>
  );
};

const StyledIconButton = styled.button<{
  variant: ButtonIcon;
  disabled: boolean;
  size: number;
}>`
  appearance: none;
  background-color: transparent;
  background-repeat: no-repeat;
  background-size: contain;
  border: none;
  cursor: pointer;
  ${({ size }) => css`
    height: ${size}px;
    width: ${size}px;
  `}
  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.5;
    `}
  ${({ variant }) => variant && `background-image: ${iconVariants[variant]};`}
`;

const Container = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  gap: 0.5rem;

  &:hover {
    opacity: 0.7;
  }
`;

export default IconButton;
