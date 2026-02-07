import toast from 'react-hot-toast';
import { baseApi } from '@/baseApi';
import { t } from 'i18next';
import { parseAndTransformTo } from '@/utils/http';
import {
  messagesResponseCodec,
  reportListResponseType,
  Reports,
  ReportMessagesResult,
  toContactMap,
  toMessageMap,
  toReportMap,
  UpdateReportPayload,
} from './models';

type ReportMessagesQuery = {
  senderId: string;
  recipientId: string;
};

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
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['reports'],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success(t('reports:reportCard.update.success'));
        } catch {
          toast.error(t('reports:reportCard.update.failure'));
        }
      },
    }),
    getReportMessages: builder.query<ReportMessagesResult, ReportMessagesQuery>(
      {
        query: ({ senderId, recipientId }) =>
          `users/${senderId}/messages_for_admin?&contact_user_ids=${recipientId}&desc=true`,
        providesTags: ['adminMessages'],
        transformResponse: (response: unknown) =>
          parseAndTransformTo(
            response,
            messagesResponseCodec,
            { resources: [], contacts: [] },
            data => ({
              messages: toMessageMap(data),
              contacts: toContactMap(data),
            }),
          ),
        async onQueryStarted(_, { queryFulfilled }) {
          try {
            await queryFulfilled;
          } catch (err) {
            toast.error(
              'reports:chatInspection.failure.fetchingReportMessages',
            );
          }
        },
      },
    ),
  }),
});

export const {
  useGetReportsQuery,
  useGetReportMessagesQuery,
  useDeleteReportMutation,
  useUpdateReportMutation,
} = reportsApi;
