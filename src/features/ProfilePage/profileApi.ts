import { t } from 'i18next';
import toast from 'react-hot-toast';

import { baseApi } from '@/baseApi';
import { authenticationApi } from '../Authentication/authenticationApi';

import { type Account, type User } from '../Authentication/models';

type PasswordUpdate = {
  accountId: string;
  currentPassword: string;
  newPassword: string;
};

export const profileApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    changePassword: builder.mutation<unknown, PasswordUpdate>({
      query: ({ accountId, currentPassword, newPassword }) => ({
        url: `accounts/${accountId}/password`,
        method: 'put',
        body: { current_password: currentPassword, new_password: newPassword },
      }),
      invalidatesTags: ['myuser'],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success(t('profile:notification.success.password'), {
            id: 'password-success',
          });
        } catch (err) {
          toast.error(t('profile:notification.failure.password'), {
            id: 'password-failure',
          });
        }
      },
    }),
    deleteAccount: builder.mutation<unknown, string>({
      query: accountId => ({
        url: `accounts/${accountId}`,
        method: 'delete',
      }),
      invalidatesTags: ['myuser'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(
            authenticationApi.endpoints.logout.initiate(),
          ).unwrap();
        } catch (err) {
          toast.error(t('profile:notification.failure.delete'), {
            id: 'delete-failure',
          });
        }
      },
    }),
    updateAccount: builder.mutation<unknown, Account>({
      query: account => ({
        url: `accounts/${account.id}`,
        method: 'put',
        body: account,
      }),
      invalidatesTags: ['myuser', 'users', 'accounts'],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success(t('profile:notification.success.update'), {
            id: 'update-success',
          });
        } catch (err) {
          toast.error(t('profile:notification.failure.update'), {
            id: 'update-failure',
          });
        }
      },
    }),
    updateUser: builder.mutation<unknown, User>({
      query: user => ({
        url: `users/${user.id}`,
        method: 'put',
        body: user,
      }),
      invalidatesTags: ['myuser', 'users', 'accounts', 'mentors'],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success(t('profile:notification.success.update'), {
            id: 'update-success',
          });
        } catch (err) {
          toast.error(t('profile:notification.failure.update'), {
            id: 'update-failure',
          });
        }
      },
    }),
  }),
});

export const {
  useChangePasswordMutation,
  useDeleteAccountMutation,
  useUpdateAccountMutation,
  useUpdateUserMutation,
} = profileApi;
