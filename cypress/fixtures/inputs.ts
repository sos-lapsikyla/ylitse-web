const getTooYoungBirthYear = (): string =>
  String(new Date().getFullYear() - 16); // Younger than 17

export const INVALID_BIRTH_YEARS = [
  '0',
  '1',
  '1899',
  getTooYoungBirthYear(),
  '2100',
  '9999',
];

export const INVALID_EMAILS = [
  'plainaddress',
  '#@%^%#$@#$@#.com',
  '@example.com',
  'Joe Smith <email@example.com>',
  'email.example.com',
  'email@example@example.com',
  'あいうえお@example.com',
  'email@example.com (Joe Smith)',
  'email@example',
  'email@111.222.333.44444',
  'a',
  `${'x'.repeat(400)}@example.org`,
];

export const NEW_BIRTH_YEAR = '2000';
export const NEW_LOGIN_NAME = 'newLoginName';
export const NEW_DISPLAY_NAME = 'newDisplayName';
export const NEW_EMAIL = 'new.email@domain.com';
export const NEW_PASSWORD = 'newPassword';
export const NEW_STATUS_MESSAGE = 'This is a new status message.';
export const NEW_STORY = 'This is a new story.';
export const NEW_AREA = 'Area 1';
export const TOO_SHORT_DISPLAY_NAME = 'a';
export const TOO_SHORT_PASSWORD = 'short';
export const WRONG_PASSWORD = 'wrongPassword';
