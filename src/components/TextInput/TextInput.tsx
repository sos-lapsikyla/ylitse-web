import CSS from 'csstype';
import { ComponentPropsWithoutRef, ElementType } from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';

import { ButtonIcon, iconVariants } from '@/components/Buttons/variants';
import { Color, palette } from '@/components/constants';
import { IconButton } from '@/components/Buttons';
import { TextInputElement, variants } from './variants';

import type { TextInputVariant } from './variants';

const NumberInputStyles = createGlobalStyle`
  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }
`;

export type InputType = 'number' | 'password' | 'text';

type TextInputProps<T extends ElementType> = {
  variant?: TextInputVariant;
  color?: Color;
  className?: string;
  isDisabled?: boolean;
  isError?: boolean;
  id?: string;
  leftIcon?: {
    variant: ButtonIcon;
    sizeInPx: number;
  };
  rightButton?: {
    variant: ButtonIcon;
    sizeInPx: number;
  } & ComponentPropsWithoutRef<T>;
  rows?: number;
  onBlur?: () => void;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: InputType;
  value: string;
};

export const TextInput = <T extends ElementType = TextInputElement>({
  className,
  variant = 'input',
  color = 'blueDark',
  isDisabled = false,
  isError = false,
  id,
  leftIcon,
  rightButton,
  rows = 2,
  onBlur,
  onChange,
  placeholder = '',
  type = 'text',
  value,
}: TextInputProps<T>): React.JSX.Element => {
  const TextInputElement = variants[variant].element;
  const variantStyles = variants[variant].styles;

  const variantBorder: CSS.Properties = {
    border: isError
      ? `2px solid ${palette.redDark}`
      : `1px solid ${palette.purple}`,
  };
  const variantColor: CSS.Properties = { color: palette[color] };

  const isNumberInput = type === 'number';
  const isTextArea = variant === 'textarea';

  return (
    <>
      {isNumberInput && <NumberInputStyles />}

      {leftIcon && (
        <LeftIcon variant={leftIcon.variant} sizeInPx={leftIcon.sizeInPx} />
      )}
      <TextInputElement
        className={className}
        disabled={isDisabled}
        id={id}
        onBlur={onBlur}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          ...variantStyles,
          ...variantBorder,
          ...variantColor,
        }}
        type={type}
        value={value}
        {...(isTextArea && { rows })}
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
  ${({ variant }) => variant && `background-image: ${iconVariants[variant]};`}
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
