import toast from 'react-hot-toast';
import { baseApi } from '@/baseApi';
import { parseAndTransformTo } from '@/utils/http';
import { reportListResponseType, Reports, toReportMap } from './models';

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
  }),
});

export const { useGetReportsQuery } = reportsApi;
