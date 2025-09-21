import { FOOTER_HEIGHT, palette } from '../constants';

export type TextVariant = keyof typeof variants;

export const variants = {
  blueBox: {
    element: 'p',
    styles: {
      backgroundColor: `${palette.blueWhite}`,
      borderLeft: '10px white solid',
      boxShadow: `-10px 0 0 0 ${palette.blue}`,
      fontFamily: '"Source Sans 3"',
      fontSize: '1rem',
      fontStyle: 'normal',
      fontWeight: 400,
      left: '10px',
      lineHeight: '1.5rem',
      marginRight: '10px',
      padding: '1rem',
      position: 'relative',
    },
  },
  boldBaloo: {
    element: 'p',
    styles: {
      fontFamily: '"Baloo 2"',
      fontSize: '1rem',
      fontStyle: 'normal',
      fontWeight: '700',
      lineHeight: '1.5rem',
      margin: 0,
    },
  },
  bold: {
    element: 'p',
    styles: {
      fontFamily: '"Source Sans 3"',
      fontSize: '1rem',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: '1.5rem',
      margin: 0,
    },
  },
  chip: {
    element: 'p',
    styles: {
      fontFamily: '"Source Sans 3"',
      fontSize: '1rem',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '1rem',
      margin: 0,
    },
  },
  error: {
    element: 'p',
    styles: {
      fontFamily: '"Source Sans 3"',
      fontSize: '0.8rem',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '1rem',
      margin: 0,
    },
  },
  footer: {
    element: 'p',
    styles: {
      fontFamily: '"Source Sans 3"',
      fontSize: '1rem',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: FOOTER_HEIGHT,
      margin: 0,
    },
  },
  h1: {
    element: 'h1',
    styles: {
      fontFamily: '"Baloo 2"',
      fontSize: '1.65rem',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '2.65rem',
      margin: 0,
    },
  },
  h2: {
    element: 'h2',
    styles: {
      fontFamily: '"Baloo 2"',
      fontSize: '1.45rem',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: '2.3rem',
      margin: 0,
    },
  },
  h3: {
    element: 'h3',
    styles: {
      fontFamily: '"Baloo 2"',
      fontSize: '1.15rem',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: '1.85rem',
      margin: 0,
    },
  },
  label: {
    element: 'label',
    styles: {
      fontFamily: '"Source Sans 3"',
      fontSize: '1rem',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: '2rem',
    },
  },
  inlineLink: {
    element: 'a',
    styles: {
      fontFamily: '"Baloo 2"',
      fontSize: '1rem',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '1.5rem',
    },
  },
  link: {
    element: 'a',
    styles: {
      fontFamily: '"Baloo 2"',
      fontSize: '1rem',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '3rem',
    },
  },
  span: {
    element: 'span',
    styles: {
      fontFamily: '"Baloo 2"',
      fontSize: '1rem',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '3rem',
    },
  },
  logo: {
    element: 'p',
    styles: {
      fontFamily: '"Baloo 2"',
      fontSize: '2rem',
      fontStyle: 'normal',
      fontWeight: 600,
      letterSpacing: '0.1em',
      lineHeight: 'initial',
      textTransform: 'uppercase',
    },
  },
  menuOption: {
    element: 'p',
    styles: {
      fontFamily: '"Source Sans 3"',
      fontSize: '1rem',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '1.5rem',
      margin: 0,
    },
  },
  p: {
    element: 'p',
    styles: {
      fontFamily: '"Source Sans 3"',
      fontSize: '1rem',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '1.5rem',
    },
  },
} as const;
