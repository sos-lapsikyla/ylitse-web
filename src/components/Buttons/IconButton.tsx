import { ComponentPropsWithoutRef, ElementType } from 'react';
import styled, { css } from 'styled-components';

import { ButtonIcon, iconVariants } from './variants';

type ButtonProps<T extends ElementType> = {
  variant: ButtonIcon;
  isDisabled?: boolean;
  sizeInPx: number;
} & ComponentPropsWithoutRef<T>;

const IconButton = <T extends ElementType = 'button'>({
  variant,
  isDisabled = false,
  sizeInPx,
  onClick,
  ...rest
}: ButtonProps<T>): JSX.Element => {
  return (
    <Container onClick={onClick}>
      <StyledIconButton
        variant={variant}
        disabled={isDisabled}
        size={sizeInPx}
        {...rest}
        aria-label={variant}
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
  ${({ variant }) => variant && iconVariants[variant]}
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
