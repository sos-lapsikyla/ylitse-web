import styled, { css } from 'styled-components';
import { animations, palette } from '../constants';

type Variant = 'large' | 'medium' | 'small' | 'tiny';

type Props = {
  variant: Variant;
  isDark?: boolean;
  isInline?: boolean;
  isCentered?: boolean;
};

export const Spinner: React.FC<Props> = ({
  variant,
  isDark = false,
  isInline = false,
  isCentered = true,
}) => {
  return (
    <Container $isInline={isInline} $isCentered={isCentered}>
      <LoadingCircle
        id="loading"
        role="progressbar"
        $variant={variant}
        $isDark={isDark}
        $isCentered={isCentered}
      />
    </Container>
  );
};

const Container = styled.div<{ $isInline: boolean; $isCentered: boolean }>`
  ${({ $isCentered }) =>
    $isCentered &&
    css`
      /* Center vertically */
      display: grid;
      place-items: center;
    `}

  ${({ $isInline }) =>
    !$isInline &&
    css`
      min-height: 100vh;
    `}
`;

const sizes: Record<Variant, number> = {
  large: 9.7,
  medium: 5,
  small: 2,
  tiny: 1,
};

const LoadingCircle = styled.div<{
  $variant: Variant;
  $isDark: boolean;
  $isCentered: boolean;
}>`
  margin: 0;
  border-radius: 50%;

  ${animations.spin}

  ${({ $variant, $isDark }) => {
    const diameter = sizes[$variant];
    const borderWidth = diameter * 0.2;
    const border = `${borderWidth}rem solid ${
      $isDark ? palette.blue : palette.white
    }`;
    return css`
      width: ${diameter}rem;
      height: ${diameter}rem;
      margin-top: ${diameter / 2}rem;
      margin-bottom: ${diameter / 2}rem;
      border: ${border};
    `;
  }}

  ${({ $isDark }) => {
    const borderColor = $isDark ? palette.greyLight : palette.whiteOpacity;
    return css`
      border-right-color: ${borderColor};
      border-bottom-color: ${borderColor};
      border-left-color: ${borderColor};
    `;
  }}

  ${({ $isCentered }) =>
    $isCentered &&
    css`
      /* Center horizontally */
      display: block;
      margin-block: 0;
      margin-inline: auto;
    `}
`;
