import { css, keyframes } from 'styled-components';

export type Color = keyof typeof palette;

export const palette = {
  blue: '#01A5EC',
  blue2: '#43BFFF',
  blue3: '#A2DBF8',
  blueDark: '#1C325D',
  blueGrey: '#4C6282',
  blueLight: '#D3EFFF',
  blueWhite: '#E4F3FB ',
  greyFaded: '#616161',
  greyLight: '#E9E9E9',
  greyMid: '#DBDBDB',
  greyOverlay: 'rgba(57, 57, 57, 0.75)',
  orange: '#F0BA8C',
  orange2: '#FFD79B',
  orangeDark: '#B36200',
  orangeLight: '#F8E0CA',
  orangeWhite: '#FCEEE2',
  purple: '#4A2ACB',
  purpleDark: '#37119D',
  purpleHover: '#CDCBFF',
  purpleMid: '#5C33FF',
  purplePale: '#E5E4FF',
  redDark: '#972232',
  redLight: '#F1C9C6',
  redSalmon: '#EBA9A9',
  red: '#EB727C',
  redWhite: '#F9E5E4',
  white: '#FFFFFF',
  whiteOpacity: 'rgba(255, 255, 255, 0.5)',
};

// Size
export const DEFAULT_ICON_SIZE = {
  SMALL: 23,
  MEDIUM: 38,
  LARGE: 40,
  HUGE: 46,
};

// Height
export const FOOTER_HEIGHT = '3rem';
export const MOBILE_NAVIGATION_BORDER_HEIGHT = '4px';
export const NAVIGATION_HEIGHT = '3rem';
export const OUTER_VERTICAL_MARGIN = '6vh';

export const DESKTOP_CONTENT_HEIGHT = `calc(100vh - (2 * ${OUTER_VERTICAL_MARGIN} + ${NAVIGATION_HEIGHT} + ${FOOTER_HEIGHT}))`;
export const MOBILE_AND_TABLET_CONTENT_HEIGHT = `calc(100vh - (${NAVIGATION_HEIGHT} + ${MOBILE_NAVIGATION_BORDER_HEIGHT} + ${FOOTER_HEIGHT}))`;

// Width
export const CONTENT_WIDTH = '76vw';
export const DIALOG_WIDTH = '687px';
export const OUTER_HORIZONTAL_MARGIN = '6vw';

// Breakpoints
export const TABLET_TRESHOLD = 1510; // (CHAT_MENU_WIDTH + 5 * CHAT_GAP_WIDTH + CHAT_WINDOW_MIN_WIDTH)
export const MOBILE_TRESHOLD = 600;
export const breakpoints = {
  mobile: `${MOBILE_TRESHOLD}px`,
  tablet: `${TABLET_TRESHOLD}px`,
};

export const spacing = {
  layout_spacing: '2rem',
};

const growDown = keyframes`
    0% {
        transform: scaleY(0)
    }
    80% {
        transform: scaleY(1.1)
    }
    100% {
        transform: scaleY(1)
    }
`;

const shake = keyframes`
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
`;

const spin = keyframes`
from { transform: rotate(0deg); }
to { transform: rotate(360deg); }
`;

export const animations = {
  growDown: css`
    ${growDown} 400ms ease-in-out forwards;
  `,
  shake: css`
    ${shake} 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97)
        both;
  `,
  spin: css`
    ${spin} 1.5s linear infinite;
  `,
};
