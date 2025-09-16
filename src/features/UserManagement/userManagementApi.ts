import { parseAndTransformTo } from '../../utils/http';
import toast from 'react-hot-toast';
import { t } from 'i18next';
import { managedUserListResponseType, toManagedUserRecord } from './models';

import type { ManagedUsers } from './models';

import { baseApi } from '../../baseApi';

export const managedUsersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getManagedUsers: builder.query<ManagedUsers, void>({
      query: () => 'users',
      providesTags: ['accounts'],
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
  }),
});

export const { useGetManagedUsersQuery } = managedUsersApi;
