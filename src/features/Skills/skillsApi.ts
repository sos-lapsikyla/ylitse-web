import { baseApi } from '@/baseApi';
import { parseAndTransformTo } from '@/utils/http';
import { skillListResponseType, Skills, toSkillMap } from './models';
import toast from 'react-hot-toast';

export const skillsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getSkills: builder.query<Skills, void>({
      query: () => 'skills',
      providesTags: ['skills'],
      transformResponse: (response: unknown) =>
        parseAndTransformTo(
          response,
          skillListResponseType,
          { resources: [] },
          toSkillMap,
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

export const { useGetSkillsQuery } = skillsApi;
