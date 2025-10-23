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
export const ICON_SIZES = {
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
export const DIALOG_WIDTH = '700px';
export const OUTER_HORIZONTAL_MARGIN = '6vw';

// Breakpoints
export const TABLET_THRESHOLD = 1310; // (CHAT_MENU_WIDTH + 5 * CHAT_GAP_WIDTH + CHAT_WINDOW_MIN_WIDTH)
export const TABLET_NARROW_THRESHOLD = 991;
export const MOBILE_THRESHOLD = 768;
export const breakpoints = {
  mobile: `${MOBILE_THRESHOLD}px`,
  tablet: `${TABLET_THRESHOLD}px`,
  tabletNarrow: `${TABLET_NARROW_THRESHOLD}px`,
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

export const Languages = [
  { id: 'ab', name: 'Abkhazian' },
  { id: 'aa', name: 'Afar' },
  { id: 'af', name: 'Afrikaans' },
  { id: 'ak', name: 'Akan' },
  { id: 'sq', name: 'Albanian' },
  { id: 'am', name: 'Amharic' },
  { id: 'ar', name: 'Arabic' },
  { id: 'an', name: 'Aragonese' },
  { id: 'hy', name: 'Armenian' },
  { id: 'as', name: 'Assamese' },
  { id: 'av', name: 'Avaric' },
  { id: 'ae', name: 'Avestan' },
  { id: 'ay', name: 'Aymara' },
  { id: 'az', name: 'Azerbaijani' },
  { id: 'bm', name: 'Bambara' },
  { id: 'ba', name: 'Bashkir' },
  { id: 'eu', name: 'Basque' },
  { id: 'be', name: 'Belarusian' },
  { id: 'bn', name: 'Bengali' },
  { id: 'bh', name: 'Bihari languages' },
  { id: 'bi', name: 'Bislama' },
  { id: 'bs', name: 'Bosnian' },
  { id: 'br', name: 'Breton' },
  { id: 'bg', name: 'Bulgarian' },
  { id: 'my', name: 'Burmese' },
  { id: 'ca', name: 'Catalan' },
  { id: 'km', name: 'Central Khmer' },
  { id: 'ch', name: 'Chamorro' },
  { id: 'ce', name: 'Chechen' },
  { id: 'zh', name: 'Chinese' },
  { id: 'cu', name: 'Church Slavic' },
  { id: 'cv', name: 'Chuvash' },
  { id: 'kw', name: 'Cornish' },
  { id: 'co', name: 'Corsican' },
  { id: 'cr', name: 'Cree' },
  { id: 'hr', name: 'Croatian' },
  { id: 'cs', name: 'Czech' },
  { id: 'da', name: 'Danish' },
  { id: 'dv', name: 'Divehi' },
  { id: 'nl', name: 'Dutch' },
  { id: 'dz', name: 'Dzongkha' },
  { id: 'en', name: 'English' },
  { id: 'eo', name: 'Esperanto' },
  { id: 'et', name: 'Estonian' },
  { id: 'ee', name: 'Ewe' },
  { id: 'fo', name: 'Faroese' },
  { id: 'fj', name: 'Fijian' },
  { id: 'fi', name: 'Finnish' },
  { id: 'fr', name: 'French' },
  { id: 'ff', name: 'Fulah' },
  { id: 'gd', name: 'Gaelic' },
  { id: 'gl', name: 'Galician' },
  { id: 'lg', name: 'Ganda' },
  { id: 'ka', name: 'Georgian' },
  { id: 'de', name: 'German' },
  { id: 'el', name: 'Greek' },
  { id: 'gn', name: 'Guarani' },
  { id: 'gu', name: 'Gujarati' },
  { id: 'ht', name: 'Haitian' },
  { id: 'ha', name: 'Hausa' },
  { id: 'he', name: 'Hebrew' },
  { id: 'hz', name: 'Herero' },
  { id: 'hi', name: 'Hindi' },
  { id: 'ho', name: 'Hiri Motu' },
  { id: 'hu', name: 'Hungarian' },
  { id: 'is', name: 'Icelandic' },
  { id: 'io', name: 'Ido' },
  { id: 'ig', name: 'Igbo' },
  { id: 'id', name: 'Indonesian' },
  { id: 'ia', name: 'Interlingua' },
  { id: 'ie', name: 'Interlingue' },
  { id: 'iu', name: 'Inuktitut' },
  { id: 'ik', name: 'Inupiaq' },
  { id: 'ga', name: 'Irish' },
  { id: 'it', name: 'Italian' },
  { id: 'ja', name: 'Japanese' },
  { id: 'jv', name: 'Javanese' },
  { id: 'kl', name: 'Kalaallisut' },
  { id: 'kn', name: 'Kannada' },
  { id: 'kr', name: 'Kanuri' },
  { id: 'ks', name: 'Kashmiri' },
  { id: 'kk', name: 'Kazakh' },
  { id: 'ki', name: 'Kikuyu' },
  { id: 'rw', name: 'Kinyarwanda' },
  { id: 'ky', name: 'Kirghiz' },
  { id: 'kv', name: 'Komi' },
  { id: 'kg', name: 'Kongo' },
  { id: 'ko', name: 'Korean' },
  { id: 'kj', name: 'Kuanyama' },
  { id: 'ku', name: 'Kurdish' },
  { id: 'lo', name: 'Lao' },
  { id: 'la', name: 'Latin' },
  { id: 'lv', name: 'Latvian' },
  { id: 'li', name: 'Limburgan' },
  { id: 'ln', name: 'Lingala' },
  { id: 'lt', name: 'Lithuanian' },
  { id: 'lu', name: 'Luba-Katanga' },
  { id: 'lb', name: 'Luxembourgish' },
  { id: 'mk', name: 'Macedonian' },
  { id: 'mg', name: 'Malagasy' },
  { id: 'ms', name: 'Malay' },
  { id: 'ml', name: 'Malayalam' },
  { id: 'mt', name: 'Maltese' },
  { id: 'gv', name: 'Manx' },
  { id: 'mi', name: 'Maori' },
  { id: 'mr', name: 'Marathi' },
  { id: 'mh', name: 'Marshallese' },
  { id: 'mn', name: 'Mongolian' },
  { id: 'na', name: 'Nauru' },
  { id: 'nv', name: 'Navajo' },
  { id: 'ng', name: 'Ndonga' },
  { id: 'ne', name: 'Nepali' },
  { id: 'nd', name: 'North Ndebele' },
  { id: 'se', name: 'Northern Sami' },
  { id: 'nb', name: 'Norwegian Bokmål' },
  { id: 'nn', name: 'Norwegian Nynorsk' },
  { id: 'no', name: 'Norwegian' },
  { id: 'ny', name: 'Nyanja' },
  { id: 'oc', name: 'Occitan' },
  { id: 'oj', name: 'Ojibwa' },
  { id: 'or', name: 'Oriya' },
  { id: 'om', name: 'Oromo' },
  { id: 'os', name: 'Ossetian' },
  { id: 'pi', name: 'Pali' },
  { id: 'pa', name: 'Panjabi' },
  { id: 'fa', name: 'Persian' },
  { id: 'pl', name: 'Polish' },
  { id: 'pt', name: 'Portuguese' },
  { id: 'ps', name: 'Pushto' },
  { id: 'qu', name: 'Quechua' },
  { id: 'ro', name: 'Romanian' },
  { id: 'rm', name: 'Romansh' },
  { id: 'rn', name: 'Rundi' },
  { id: 'ru', name: 'Russian' },
  { id: 'sm', name: 'Samoan' },
  { id: 'sg', name: 'Sango' },
  { id: 'sa', name: 'Sanskrit' },
  { id: 'sc', name: 'Sardinian' },
  { id: 'sr', name: 'Serbian' },
  { id: 'sn', name: 'Shona' },
  { id: 'ii', name: 'Sichuan Yi' },
  { id: 'sd', name: 'Sindhi' },
  { id: 'si', name: 'Sinhala' },
  { id: 'sk', name: 'Slovak' },
  { id: 'sl', name: 'Slovenian' },
  { id: 'so', name: 'Somali' },
  { id: 'nr', name: 'South Ndebele' },
  { id: 'st', name: 'Southern Sotho' },
  { id: 'es', name: 'Spanish' },
  { id: 'su', name: 'Sundanese' },
  { id: 'sw', name: 'Swahili' },
  { id: 'ss', name: 'Swati' },
  { id: 'sv', name: 'Swedish' },
  { id: 'tl', name: 'Tagalog' },
  { id: 'ty', name: 'Tahitian' },
  { id: 'tg', name: 'Tajik' },
  { id: 'ta', name: 'Tamil' },
  { id: 'tt', name: 'Tatar' },
  { id: 'te', name: 'Telugu' },
  { id: 'th', name: 'Thai' },
  { id: 'bo', name: 'Tibetan' },
  { id: 'ti', name: 'Tigrinya' },
  { id: 'to', name: 'Tonga' },
  { id: 'ts', name: 'Tsonga' },
  { id: 'tn', name: 'Tswana' },
  { id: 'tr', name: 'Turkish' },
  { id: 'tk', name: 'Turkmen' },
  { id: 'tw', name: 'Twi' },
  { id: 'ug', name: 'Uighur' },
  { id: 'uk', name: 'Ukrainian' },
  { id: 'ur', name: 'Urdu' },
  { id: 'uz', name: 'Uzbek' },
  { id: 've', name: 'Venda' },
  { id: 'vi', name: 'Vietnamese' },
  { id: 'vo', name: 'Volapük' },
  { id: 'wa', name: 'Walloon' },
  { id: 'cy', name: 'Welsh' },
  { id: 'fy', name: 'Western Frisian' },
  { id: 'wo', name: 'Wolof' },
  { id: 'xh', name: 'Xhosa' },
  { id: 'yi', name: 'Yiddish' },
  { id: 'yo', name: 'Yoruba' },
  { id: 'za', name: 'Zhuang' },
  { id: 'zu', name: 'Zulu' },
];
