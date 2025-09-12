import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { defaultAppUser } from './models';
import { authenticationApi } from './authenticationApi';

import type { Account, AppUser, User } from './models';
import type { ApiMentor } from '../MentorPage/models';

const initialState: AppUser = defaultAppUser;

export const user = createSlice({
  initialState: initialState,
  name: 'user',

  reducers: create => ({
    logout: create.reducer(() => initialState),

    setAccount: create.reducer((state, action: PayloadAction<Account>) => {
      state.account = action.payload;
    }),

    setMentor: create.reducer((state, action: PayloadAction<ApiMentor>) => {
      state.mentor = action.payload;
    }),

    setUser: create.reducer((state, action: PayloadAction<User>) => {
      state.user = action.payload;
    }),
  }),

  extraReducers: builder => {
    builder
      .addMatcher(
        authenticationApi.endpoints.getMe.matchFulfilled,
        (_, { payload }) => payload,
      )
      .addMatcher(authenticationApi.endpoints.logout.matchFulfilled, () => {
        window.location.href = '/';
        return initialState;
      });
  },
});

export const { setAccount, setMentor, setUser } = user.actions;
