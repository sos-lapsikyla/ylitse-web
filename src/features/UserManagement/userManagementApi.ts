import { parseAndTransformTo } from '../../utils/http';
import toast from 'react-hot-toast';
import { t } from 'i18next';
import {
  accountsListResponseType,
  managedUserListResponseType,
  toManagedAccountRecord,
  toManagedUserRecord,
} from './models';

import type { Accounts, ManagedUsers } from './models';

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
      providesTags: ['users'],
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
  }),
});

export const { useGetManagedUsersQuery, useGetManagedAccountsQuery } =
  managedUsersApi;
