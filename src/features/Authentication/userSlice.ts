import { createSelector } from 'reselect';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  authenticationApi,
  defaultAppUser,
  defaultMentor,
} from './authenticationApi';
import { selectHasBeenChatting } from '../Chat/selectors';

import type { Account, AppUser, User } from './authenticationApi';
import type { ApiMentor } from '../MentorPage/mentorPageApi';
import type { RootState } from '@/store';

const initialState: AppUser = defaultAppUser;

export const user = createSlice({
  initialState: initialState,
  name: 'user',
  reducers: {
    logout: () => initialState,
    setAccount: (state, action: PayloadAction<Account>) => {
      state.account = action.payload;
    },
    setMentor: (state, action: PayloadAction<ApiMentor>) => {
      state.mentor = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        authenticationApi.endpoints.getMe.matchFulfilled,
        (_, { payload }) => payload,
      )
      .addMatcher(authenticationApi.endpoints.logout.matchFulfilled, () => {
        sessionStorage.removeItem('refresh_token');
        sessionStorage.removeItem('access_token');
        window.location.href = '/login/';
        return initialState;
      });
  },
});

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

export const selectAppRole = createSelector(
  selectUserRole,
  selectHasBeenChatting,
  (userRole, hasBeenChatting) => {
    if (userRole === 'mentee' && !hasBeenChatting) return 'freshMentee';
    return userRole;
  },
);

export const { setAccount, setMentor, setUser } = user.actions;
