import { RoleStatus } from '@/features/UserManagement/components/UserCard/RoleTag';
import { Status } from '@/features/MentorPage/components/MentorList/MentorCard/List/Tag';

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

export const getRoleStatus = (
  isMentor: boolean,
  isVacationingMentor: boolean,
  isMentee: boolean,
  isAdmin: boolean,
): RoleStatus => {
  if (isMentor) return 'mentor';
  if (isVacationingMentor) return 'vacationingMentor';
  if (isMentee) return 'mentee';
  if (isAdmin) return 'admin';
  return 'default';
};
