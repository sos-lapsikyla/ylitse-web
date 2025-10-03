import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import styled from 'styled-components';

import { spacing } from '../constants';
import { iconVariants, variants } from './variants';

import type { ButtonIcon, ButtonVariant } from './variants';

type Size = 'normal' | 'large';

type ButtonProps<T extends ElementType> = {
  children: ReactNode;
  className?: string;
  isDisabled?: boolean;
  size?: Size;
  variant?: ButtonVariant;
  leftIcon?: ButtonIcon;
} & ComponentPropsWithoutRef<T>;

const TextButton = <T extends ElementType = 'button'>({
  children,
  isDisabled = false,
  size = 'normal',
  variant = 'dark',
  leftIcon,
  ...rest
}: ButtonProps<T>): React.JSX.Element => (
  <StyledTextButton
    disabled={isDisabled}
    $size={size}
    $variant={variant}
    {...rest}
  >
    {leftIcon && <Icon $variant={leftIcon} $size={size} />}
    {children}
  </StyledTextButton>
);

const iconSizes: Record<Size, string> = {
  normal: '18px',
  large: '24px',
};

const Icon = styled.span<{
  $variant: ButtonIcon;
  $size: Size;
}>`
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
  height: ${({ $size }) => iconSizes[$size]};
  width: ${({ $size }) => iconSizes[$size]};
  ${({ $variant }) =>
    $variant && `background-image: ${iconVariants[$variant]};`}
`;

const StyledTextButton = styled.button<{
  $size: Size;
  $variant: ButtonVariant;
}>`
  align-items: center;
  border: none;
  border-radius: 50px;
  bottom: ${spacing.layout_spacing};
  cursor: pointer;
  display: inline-flex;
  font-family: 'Baloo 2';
  font-size: ${({ $size }) => ($size === 'large' ? '1.2rem' : '1rem')};
  font-style: normal;
  font-weight: 700;
  gap: 1rem;
  line-height: 1.5rem;
  padding: ${({ $size }) =>
    $size === 'large' ? '0.58rem 2rem' : '0.5rem 2rem'};
  width: fit-content;

  &:hover {
    opacity: 0.7;
  }
  ${({ $variant }) => variants[$variant]}
`;

export default TextButton;
