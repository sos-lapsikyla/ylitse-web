import CSS from 'csstype';
import { ReactNode } from 'react';
import { variants } from './variants';
import { palette } from '../constants';
import type { TextVariant } from './variants';
import type { Color } from '../constants';
import ExternalIcon from './ExternalIcon';

type Props = {
  variant?: TextVariant;
  color?: Color;
  className?: string;
  children?: ReactNode;
  inputId?: string;
  url?: string;
  isExternalUrl?: boolean;
};

export const Text: React.FC<Props> = ({
  variant = 'p',
  color = 'blueDark',
  className,
  children,
  inputId,
  url,
  isExternalUrl = false,
}) => {
  const TextElement = variants[variant].element;
  const variantStyles = variants[variant].styles;
  const variantColor: CSS.Properties = { color: palette[color] };

  return (
    <TextElement
      htmlFor={inputId}
      className={className}
      style={{ ...commonStyles, ...variantStyles, ...variantColor }}
      {...(url && { href: url })}
      {...(isExternalUrl && { target: '_blank', rel: 'noreferrer' })}
    >
      {children}
      {isExternalUrl && <ExternalIcon />}
    </TextElement>
  );
};

const commonStyles = {
  color: palette.white,
};
