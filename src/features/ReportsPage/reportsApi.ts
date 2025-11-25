import toast from 'react-hot-toast';
import { baseApi } from '@/baseApi';
import { t } from 'i18next';
import { parseAndTransformTo } from '@/utils/http';
import {
  reportListResponseType,
  Reports,
  toReportMap,
  UpdateReportPayload,
} from './models';

export const reportsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getReports: builder.query<Reports, void>({
      query: () => 'reports',
      providesTags: ['reports'],
      transformResponse: (response: unknown) =>
        parseAndTransformTo(
          response,
          reportListResponseType,
          { resources: [] },
          toReportMap,
          () => toast.error('error'),
        ),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          toast('error');
        }
      },
    }),
    deleteReport: builder.mutation<unknown, string>({
      query: reportId => ({
        url: `reports/${reportId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['reports'],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success(t('reports:delete.success'), {
            id: 'report-delete-success',
          });
        } catch {
          toast.error(t('reports:delete.failure'), {
            id: 'report-delete-error',
          });
        }
      },
    }),
    updateReport: builder.mutation<unknown, UpdateReportPayload>({
      query: ({ id, body }) => ({
        url: `reports/${id}`,
        method: 'patch',
        body: body,
      }),
      invalidatesTags: ['reports'],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success(t('reports:reportCard.update.success'));
        } catch (err) {
          toast.error(t('reports:reportCard.update.failure'));
        }
      },
    }),
  }),
});

export const {
  useGetReportsQuery,
  useDeleteReportMutation,
  useUpdateReportMutation,
} = reportsApi;
