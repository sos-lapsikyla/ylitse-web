import { ComponentPropsWithoutRef, ElementType } from 'react';

import CSS from 'csstype';

import { IconButton } from '@/components/Buttons';
import { ButtonIcon, iconVariants } from '@/components/Buttons/variants';
import { Color, palette } from '@/components/variables';
import { TextInputElement, variants } from './variants';
import type { TextInputVariant } from './variants';
import styled, { css } from 'styled-components';

type TextInputProps<T extends ElementType> = {
  variant?: TextInputVariant;
  color?: Color;
  className?: string;
  isDisabled?: boolean;
  id?: string;
  leftIcon?: {
    variant: ButtonIcon;
    sizeInPx: number;
  };
  rightButton?: {
    variant: ButtonIcon;
    sizeInPx: number;
  } & ComponentPropsWithoutRef<T>;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
};

export const TextInput = <T extends ElementType = TextInputElement>({
  variant = 'input',
  color = 'blueDark',
  className,
  isDisabled = false,
  id,
  leftIcon,
  rightButton,
  onChange,
  placeholder = '',
  value,
}: TextInputProps<T>): JSX.Element => {
  const TextInputElement = variants[variant].element;
  const variantStyles = variants[variant].styles;
  const variantColor: CSS.Properties = { color: palette[color] };

  return (
    <>
      {leftIcon && (
        <LeftIcon variant={leftIcon.variant} sizeInPx={leftIcon.sizeInPx} />
      )}
      <TextInputElement
        className={className}
        disabled={isDisabled}
        id={id}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ ...variantStyles, ...variantColor }}
        type="text"
        value={value}
      />
      {rightButton && (
        <StyledIconButton
          onClick={rightButton.onClick}
          variant={rightButton.variant}
          sizeInPx={rightButton.sizeInPx}
        />
      )}
    </>
  );
};

const LeftIcon = styled.div<{
  variant: ButtonIcon;
  sizeInPx: number;
}>`
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;
  ${({ variant }) => variant && iconVariants[variant]}
  ${({ sizeInPx }) => css`
    height: ${sizeInPx}px;
    transform: translate(${sizeInPx + 22}px);
    width: ${sizeInPx}px;
  `}
`;

const StyledIconButton = styled(IconButton)<{
  sizeInPx: number;
}>`
  ${({ sizeInPx }) => css`
    transform: translate(-${sizeInPx + 18}px);
  `}
`;
