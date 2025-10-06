import { ComponentPropsWithoutRef, ElementType } from 'react';
import styled, { css } from 'styled-components';

import { TextVariant } from '../Text/variants';
import Text from '../Text';
import { Color } from '../constants';
import { ButtonIcon, iconVariants } from './variants';

type ButtonProps<T extends ElementType> = {
  leftIcon?: ButtonIcon;
  sizeInPx: number;
  text?: { variant: TextVariant; color: Color; text: string };
  onClick?: React.MouseEventHandler<HTMLElement>;
} & Omit<ComponentPropsWithoutRef<T>, 'onClick'>;

const Button = <T extends ElementType = 'button'>({
  variant,
  sizeInPx,
  text,
  leftIcon,
  onClick,
  ...rest
}: ButtonProps<T>): React.JSX.Element => {
  return (
    <StyledButton onClick={onClick} {...rest} aria-label={variant}>
      {leftIcon && <Icon $variant={leftIcon} $size={sizeInPx} />}

      {text && (
        <Text variant={text.variant} color={text.color}>
          {text.text}
        </Text>
      )}
    </StyledButton>
  );
};

const Icon = styled.span<{
  $variant: ButtonIcon;
  $size: number;
}>`
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: contain;
  ${({ $size }) => css`
    width: ${$size}px;
    height: ${$size}px;
  `}
  ${({ $variant }) =>
    $variant && `background-image: ${iconVariants[$variant]};`}
`;

const StyledButton = styled.button`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0;
  white-space: nowrap;
  appearance: none;
  cursor: pointer;
  background-color: transparent;
  border: none;

  &:hover {
    opacity: 0.7;
  }
`;

export default Button;
