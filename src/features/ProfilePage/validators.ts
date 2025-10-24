const DISPLAY_NAME_MAX_LENGTH = 30;
const DISPLAY_NAME_MIN_LENGTH = 2;
const EMAIL_REGEX =
  /^[a-zA-Z0-9!#$%&'*+\-/=?^_`.{|}~]{1,64}@[a-z0-9.-]+\.[a-z]{2,64}$/;
const MAX_BIRTH_YEAR = new Date().getFullYear() - 17;
const MIN_BIRTH_YEAR = 1900;
const PASSWORD_MIN_LENGTH = 8;
const REGION_MAX_LENGTH = 100;
const STATUS_MESSAGE_MAX_LENGTH = 2000;
const STORY_MAX_LENGTH = 2000;

export const isDisplayNameTooLong = (displayName: string) =>
  displayName.length > DISPLAY_NAME_MAX_LENGTH;

export const isDisplayNameTooShort = (displayName: string) =>
  displayName.length < DISPLAY_NAME_MIN_LENGTH;

export const isPasswordTooShort = (password: string, isTouched: boolean) => {
  if (!isTouched) return false;
  return password.length < PASSWORD_MIN_LENGTH;
};

export const isRegionTooLong = (region: string) =>
  region.length > REGION_MAX_LENGTH;

export const isStatusMessageTooLong = (statusMessage: string) =>
  statusMessage.length > STATUS_MESSAGE_MAX_LENGTH;

export const isStoryTooLong = (story: string) =>
  story.length > STORY_MAX_LENGTH;

export const validateBirthYear = (birthYear: unknown) => {
  if (typeof birthYear !== 'number' || Number.isNaN(birthYear)) {
    return false;
  }
  if (birthYear < MIN_BIRTH_YEAR) return false;
  if (birthYear > MAX_BIRTH_YEAR) return false;
  return true;
};

export const validateEmail = (email: string) => {
  if (email.length === 0) return true;
  if (email.length > 320) return false;
  return EMAIL_REGEX.test(email);
};
