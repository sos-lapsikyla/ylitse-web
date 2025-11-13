import { Color, palette } from '../constants';

type Variant = 'default' | 'no-ellipse';

type Props = {
  color?: Color;
  sizeInPx: number;
  variant?: Variant;
};

export const Success: React.FC<Props> = ({
  color = 'blueDark',
  sizeInPx,
  variant = 'default',
}) => (
  <svg
    width={sizeInPx}
    height={sizeInPx}
    viewBox={variant === 'no-ellipse' ? '10 10 28 28' : '0 0 48 48'}
    fill="none"
    color={palette[color]}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="info">
      {variant !== 'no-ellipse' && (
        <path
          id="Ellipse 19"
          d="M47 24C47 36.7026 36.7025 47 24 47C11.2975 47 1 36.7026 1 24C1 11.2975 11.2974 1 24 1C36.7025 1 47 11.2975 47 24Z"
          stroke="currentColor"
          strokeWidth="2"
        />
      )}
      <path
        id="Vector 1 (Stroke)"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M33.9172 13.3746C35.0123 14.0786 35.3293 15.537 34.6254 16.632L23.5133 33.9175C23.0907 34.575 22.3696 34.9802 21.5883 34.9993C20.8069 35.0184 20.0669 34.6489 19.6126 34.0129L13.4392 25.3702C12.6826 24.3109 12.9279 22.8387 13.9872 22.0821C15.0466 21.3254 16.5187 21.5708 17.2753 22.6301L21.4279 28.4438L30.6599 14.0828C31.3638 12.9877 32.8222 12.6707 33.9172 13.3746Z"
        fill="currentColor"
      />
    </g>
  </svg>
);
