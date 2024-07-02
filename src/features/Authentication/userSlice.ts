import { RootState } from '@/store';
import { createSelector } from 'reselect';
import { createSlice } from '@reduxjs/toolkit';
import { isRight } from 'fp-ts/lib/Either';
import { fetchMyUser } from './myuserApi';

export type UserRole = 'mentee' | 'mentor' | 'admin';

type Authentication = {
  userId: string | null;
  userRole: UserRole | null;
};

const initialState: Authentication = {
  userId: null,
  userRole: null,
};

export const user = createSlice({
  initialState: initialState,
  name: 'user',
  reducers: {
    logout: () => {
      return { userId: null, userRole: null };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMyUser.fulfilled, ({ userId }, { payload }) => {
        const nextUserId = isRight(payload) ? payload.right.user.id : userId;
        const userRole = isRight(payload) ? payload.right.account.role : null;
        return { userId: nextUserId, userRole };
      })
      .addCase(fetchMyUser.rejected, () => {
        window.location.href = '/login/';
      });
  },
});

const selectUserState = ({ user }: RootState) => user;

export const selectIsLoggedIn = createSelector(selectUserState, ({ userId }) =>
  Boolean(userId),
);

export const selectUserId = createSelector(
  selectUserState,
  ({ userId }) => userId,
);

export const selectUserRole = createSelector(
  selectUserState,
  ({ userRole }) => userRole,
);
