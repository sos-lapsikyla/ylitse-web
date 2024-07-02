import CSS from 'csstype';
import { FOOTER_HEIGHT } from '../variables';

export type TextVariant =
  | 'boldBaloo'
  | 'bold'
  | 'chip'
  | 'footer'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'link'
  | 'label'
  | 'logo'
  | 'p';
export type TextElement = 'a' | 'h1' | 'h2' | 'h3' | 'label' | 'p';

type TextProp = {
  element: TextElement;
  styles: CSS.Properties;
};

export const variants: Record<TextVariant, TextProp> = {
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
      fontFamily: '"Source Sans Pro"',
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
      fontFamily: '"Source Sans Pro"',
      fontSize: '1rem',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '1rem',
      margin: 0,
    },
  },
  footer: {
    element: 'p',
    styles: {
      fontFamily: '"Source Sans Pro"',
      fontSize: '1rem',
      fontStyle: 'normal',
      fontWeight: 400,
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
      fontFamily: '"Source Sans Pro"',
      fontSize: '1rem',
      fontStyle: 'normal',
      fontWeight: 600,
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
  p: {
    element: 'p',
    styles: {
      fontFamily: '"Source Sans Pro"',
      fontSize: '1rem',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '1.5rem',
    },
  },
};
