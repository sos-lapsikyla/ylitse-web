import { createSelector } from 'reselect';

import { defaultMentor } from './models';
import { selectHasBeenChatting } from '../Chat/selectors';

import type { RootState } from '@/store';

export const selectAccount = ({ user }: RootState) => user.account;

export const selectMentor = ({ user }: RootState) =>
  user.mentor ?? defaultMentor;

export const selectUser = ({ user }: RootState) => user.user;

export const selectIsLoggedIn = createSelector(selectUser, ({ id }) =>
  Boolean(id),
);

export const selectAccountId = createSelector(selectAccount, ({ id }) => id);

export const selectUserId = createSelector(selectUser, ({ id }) => id);

export const selectUserRole = createSelector(selectUser, ({ role }) => role);

export const selectIsMentee = createSelector(
  selectUserRole,
  role => role === 'mentee',
);

export const selectIsMentor = createSelector(
  selectUserRole,
  role => role === 'mentor',
);

export const selectIsAdmin = createSelector(
  selectUserRole,
  role => role === 'admin',
);

export const selectAppRole = createSelector(
  selectUserRole,
  selectHasBeenChatting,
  (userRole, hasBeenChatting) => {
    if (userRole === 'mentor' && !hasBeenChatting) return 'freshMentor';
    if (userRole === 'mentee' && !hasBeenChatting) return 'freshMentee';
    return userRole;
  },
);
