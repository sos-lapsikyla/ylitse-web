import toast from 'react-hot-toast';
import { baseApi } from '@/baseApi';
import { t } from 'i18next';
import { parseAndTransformTo } from '@/utils/http';
import {
  ApiReport,
  reportListResponseType,
  Reports,
  toReportMap,
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
    updateReport: builder.mutation<unknown, ApiReport>({
      query: report => ({
        url: `reports/${report.id}`,
        method: 'put',
        body: report,
      }),
      invalidatesTags: ['reports'],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('päivitys onnistui');
        } catch (err) {
          toast.error('päivitys epäonnistui');
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
