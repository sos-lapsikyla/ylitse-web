import { Status } from '@/features/MentorPage/components/MentorList/MentorCard/List/Tag';

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const getIsOlderThanDaysAgo = (daysAgo: number, compareTime: number) => {
  const timestampDaysAgo = new Date().getTime() - daysAgo * 24 * 60 * 60 * 1000;
  return compareTime > timestampDaysAgo;
};

export const getStatus = (
  isMe: boolean,
  isAvailable: boolean,
  isNew: boolean,
): Status => {
  if (isMe) {
    return 'me';
  }
  if (!isAvailable) {
    return 'unavailable';
  }
  if (isNew) {
    return 'new';
  }
  return 'empty';
};
