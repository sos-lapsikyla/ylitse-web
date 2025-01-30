import { palette } from '../constants';

export type TextInputElement = 'input' | 'textarea';
export type TextInputVariant = keyof typeof variants;

export const variants = {
  iconInput: {
    element: 'input',
    styles: {
      border: `1px solid ${palette.purple}`,
      borderRadius: '20px',
      fontFamily: 'Source Sans 3',
      fontSize: '1rem',
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: '1.5rem',
      padding: '0.5rem 60px',
    },
  },
  input: {
    element: 'input',
    styles: {
      border: `1px solid ${palette.purple}`,
      borderRadius: '5px',
      boxSizing: 'border-box',
      fontFamily: 'Source Sans 3',
      fontSize: '1rem',
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: '1.5rem',
      padding: '0.5rem 1rem',
      width: '100%',
    },
  },
  textarea: {
    element: 'textarea',
    styles: {
      border: `1px solid ${palette.purple}`,
      borderRadius: '10px',
      fontFamily: 'Source Sans 3',
      fontSize: '1rem',
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: '1.5rem',
      padding: '0.75rem 1.25rem',
      resize: 'none',
      width: '-webkit-fill-available',
    },
  },
} as const;
