import { parseAndTransformTo } from '../../utils/http';
import toast from 'react-hot-toast';
import { t } from 'i18next';
import {
  accountsListResponseType,
  managedUserListResponseType,
  toManagedAccountRecord,
  toManagedUserRecord,
  NewAccountPayload,
  MentorPayload,
} from './models';

import type {
  Accounts,
  CreatedAccountResponse,
  ManagedUsers,
  NewUserPayload,
} from './models';

import { baseApi } from '../../baseApi';

export const managedUsersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getManagedUsers: builder.query<ManagedUsers, void>({
      query: () => 'users',
      providesTags: ['users'],
      transformResponse: (response: unknown) =>
        parseAndTransformTo(
          response,
          managedUserListResponseType,
          { resources: [] },
          toManagedUserRecord,
          () =>
            toast.error(t('users:notification.parsingUsersError'), {
              id: 'users-parse-failure',
            }),
        ),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          toast.error(t('users:notification.fetchingUsersError'), {
            id: 'users-fetch-failure',
          });
        }
      },
    }),
    getManagedAccounts: builder.query<Accounts, void>({
      query: () => 'accounts',
      providesTags: ['accounts'],
      transformResponse: (response: unknown) =>
        parseAndTransformTo(
          response,
          accountsListResponseType,
          { resources: [] },
          toManagedAccountRecord,
          () =>
            toast.error(t('users:notification.parsingUsersError'), {
              id: 'users-parse-failure',
            }),
        ),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch {
          toast.error(t('users:notification.fetchingUsersError'), {
            id: 'users-fetch-failure',
          });
        }
      },
    }),
    deleteManagedUser: builder.mutation<unknown, string>({
      query: accountId => ({
        url: `accounts/${accountId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['users'],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success(t('users:notification.success.delete'), {
            id: 'user-delete-success',
          });
        } catch (err) {
          toast.error(t('users:notification.failure.delete'), {
            id: 'user-delete-failure',
          });
        }
      },
    }),
    addManagedAccount: builder.mutation<
      CreatedAccountResponse,
      NewAccountPayload
    >({
      query: body => ({
        url: 'accounts',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['accounts', 'users'],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success(t('users:notification.success.accountCreate'), {
            id: 'account-create-success',
          });
        } catch (err) {
          toast.error(t('users:notification.failure.accountCreate'), {
            id: 'account-create-failure',
          });
        }
      },
    }),
    addManagedUser: builder.mutation<unknown, NewUserPayload>({
      query: payload => ({
        url: `users/${payload.id}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['users', 'accounts'],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success(t('users:notification.success.userCreate'), {
            id: 'user-create-success',
          });
        } catch {
          toast.error(t('users:notification.failure.userCreate'), {
            id: 'user-create-failure',
          });
        }
      },
    }),
    addMentor: builder.mutation<unknown, MentorPayload>({
      query: payload => ({
        url: `mentors/${payload.id}`,
        method: 'PUT',
        body: payload,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('Mentor tiedot lisätty');
        } catch (err) {
          toast.error('ei toimi');
        }
      },
      invalidatesTags: ['mentors'],
    }),
  }),
});

export const {
  useGetManagedUsersQuery,
  useGetManagedAccountsQuery,
  useDeleteManagedUserMutation,
  useAddManagedAccountMutation,
  useAddManagedUserMutation,
  useAddMentorMutation,
} = managedUsersApi;
